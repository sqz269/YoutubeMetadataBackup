using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using Google.Apis.YouTube.v3.Data;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using YoutubeMetadataBackup_backend.Models.api;
using YoutubeMetadataBackup_backend.Services;
using YoutubeMetadataBackup_backend.Utilities;
using YoutubeMetadataBackup_backend.YoutubeAPI;
using Video = YoutubeMetadataBackup_backend.Models.api.Video;

namespace YoutubeMetadataBackup_backend.Controllers
{
    public struct BackupVideoResult
    {
        public List<string> VideosAdded;
        public List<string> VideosFailed;
    }

    [EnableCors("AllowAll")]
    [Route("api/youtube/videos/backup")]
    [ApiController]
    public class VideoBackupController : Controller
    {
        private readonly VideoService _videoService;
        private readonly YoutubeDataAPI _youtubeDataApi;
        private readonly List<string> _apiKeys = new();        
        
        // Was planning on using HashSet, but because HashSet is not thread safe
        // we have to use ConcurrentDictionary to ensure the data is handled correctly
        // if multiple requests hits at the same time
        // https://stackoverflow.com/questions/18922985/concurrent-hashsett-in-net-framework
        // Also, for some reason (probably a feature of ASP.NET)
        // but this dictionary resets every request unless it's made static, so here it is, static
        private static readonly ConcurrentDictionary<string, byte> QueuedVideos = new();

        public VideoBackupController(IConfiguration config, VideoService videoService)
        {
            _videoService = videoService;

            var keys = config.GetSection("ServerYoutubeDataAPIKeys").AsEnumerable();

            foreach (var (_, value) in keys)
            {
                if (value != null)
                    this._apiKeys.Add(value);
            }

            // TODO: Replace this with YoutubeDataAPIManager once it's finished
            this._youtubeDataApi = new YoutubeDataAPI(_apiKeys[0]);
        }

        private BackupVideoResult BackupVideos(IEnumerable<string> videoIds)
        {
            BackupVideoResult result = new BackupVideoResult()
            {
                VideosAdded = new List<string>(),
                VideosFailed = new List<string>()
            };

            List<Video> videos = new();

            IEnumerable<string> ids = videoIds as string[] ?? videoIds.ToArray();
            for (int i = 0; i < ids.Count(); i += 50)
            {
                var queriedItems = ids.Skip(i).Take(50);
                IEnumerable<string> queryCached = queriedItems as string[] ?? queriedItems.ToArray();
                VideoListResponse responseChunk = _youtubeDataApi.GetVideoDetails(queryCached);
                Video[] videosChunk = responseChunk.ToDatabaseVideo();

                if (queryCached.Count() > responseChunk.Items.Count)
                {
                    string[] fetchItems = videosChunk.Select(v => v.Id).ToArray();
                    foreach (string id in queryCached.Except(fetchItems))
                    {
                        result.VideosFailed.Add(id);
                    }
                }

                // Map the chunk response to the array that is going to contain all the collected videos
                foreach (Video video in videosChunk)
                {
                    videos.Add(video);
                    result.VideosAdded.Add(video.Id);
                }
            }

            if (videos.Count != 0)
                this._videoService.Create(videos, true);

            return result;
        }

        [HttpPost("add")]
        public ExecutionResult<AddVideoResult> BackupVideoList([FromBody] IEnumerable<string> videoList)
        {
            string[] videoIds = videoList as string[] ?? videoList.ToArray();

            var result = _videoService.GetNonExistingVideos(videoIds);
            _videoService.IncBackupCount(result.existing);

            BackupVideoResult backupResult = this.BackupVideos(result.missing);

            var response = new AddVideoResult
            {
                TotalItemProcessed = videoIds.Length,
                TotalNewItemsAdded = backupResult.VideosAdded.Count,
                TotalItemsFailedToAdd = backupResult.VideosFailed.Count,
                AddedVideoIds = backupResult.VideosAdded,
                FailedVideoIds = backupResult.VideosFailed
            };

            return ExecutionResult<AddVideoResult>.Success(response, 1);
        }

        [HttpPost("queue")]
        public ExecutionResult<QueueVideoResult> QueueVideoForBackup([FromBody] string video)
        {
            if (!ValidationUtils.ValidateYoutubeVideoId(video))
            {
                Response.StatusCode = 400;
                return ExecutionResult<QueueVideoResult>.Fail(ErrorCode.InvalidParameters, "Invalid VideoID");
            }

            if (this._videoService.Exists(video))
            {
                this._videoService.IncBackupCount(video);

                return ExecutionResult<QueueVideoResult>.Success(
                    new QueueVideoResult(video, false, QueuedVideos.Count, false, true), 1);
            }


            bool added = QueuedVideos.TryAdd(video, byte.MinValue);

            // Indicates if this request triggered the backup action
            // which means all the videos in queue is backed up and the queue is cleared.
            bool processed = false;
            if (added)
            {
                if (QueuedVideos.Count == 50)
                {
                    // TODO: Edge Case? Queued videos is backed-up manually by a user during it's queue,
                    // causing duplicates. Solve: Add duplicates check before calling BackupVideos method

                    // TODO: Request Optimization, Make BackupVideos Async,
                    // start coroutine and return resp while the vids are still processing

                    // NOTE: This implementation considers a case where another request comes in while
                    // the backup is processing (so the queue would have 51+ itmes while it's only backing up 50.)
                    // To prevent backing up 50+ items or delete the new video Id queue (by clearing the whole queue)
                    // we must only take 50 items, delete them from queue, then proceed to backup
                    // rather than backing-up the whole QueuedVideos, then call QueuedVideos.Clear()
                    var queuedVideos = QueuedVideos.Take(50).ToArray();
                    foreach (var item in queuedVideos)
                    {
                        QueuedVideos.TryRemove(item);
                    }

                    var _ = this.BackupVideos(QueuedVideos.Keys.ToArray());

                    processed = true;
                }
            }

            return ExecutionResult<QueueVideoResult>.Success(
                new QueueVideoResult(video, true, QueuedVideos.Count, processed, false), 1);
        }
    }
}