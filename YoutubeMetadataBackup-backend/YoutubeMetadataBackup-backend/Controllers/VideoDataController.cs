#nullable enable
using System;
using System.Collections.Concurrent;
using Google.Apis.YouTube.v3.Data;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using YoutubeMetadataBackup_backend.Models.api;
using YoutubeMetadataBackup_backend.Services;
using YoutubeMetadataBackup_backend.Utilities;
using YoutubeMetadataBackup_backend.YoutubeAPI;
using Video = YoutubeMetadataBackup_backend.Models.api.Video;

namespace YoutubeMetadataBackup_backend.Controllers
{
    public class MetadataDatabaseQuery
    {
        public FilterDefinition<Video> QueryFilterDefinition;

        public int Limit;
        public int Start;
    }

    public class MetadataUserQuery
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? UploaderId { get; set; }
        public string? Uploader { get; set; }
        public long? StartTime { get; set; }
        public long? EndTime { get; set; }
        public int? Limit { get; set; }
        public int? Start { get; set; }

        public MetadataDatabaseQuery BuildDatabaseQuery()
        {
            var filter = Builders<Video>.Filter;

            int limit = 20;
            if (Limit != null)
                limit = (int) Limit;

            int start = 0;
            if (Start != null)
                start = (int) Start;

            FilterDefinition<Video> query = FilterDefinition<Video>.Empty;
            if (Title != null)
                query &= filter.Regex(nameof(Video.Title), new BsonRegularExpression(Title, "i"));

            if (Description != null)
                query &= filter.Regex(nameof(Video.Description), new BsonRegularExpression(Description, "i"));

            if (Uploader != null)
                query &= filter.Regex(nameof(Video.Uploader), new BsonRegularExpression(Uploader, "i"));

            if (UploaderId != null)
                query &= filter.Eq(nameof(Video.UploaderId), UploaderId);

            if (StartTime != null)
                query &= filter.Gt(nameof(Video.Published), StartTime);

            if (EndTime != null)
                query &= filter.Lt(nameof(Video.Published), EndTime);

            return new MetadataDatabaseQuery()
            {
                Limit = limit,
                Start = start,
                QueryFilterDefinition = query
            };
        }
    }

    public struct BackupVideoResult
    {
        public List<string> VideosAdded;
        public List<string> VideosFailed;
    }

    [EnableCors("AllowAll")]
    [Route("api/youtube/videos")]
    [ApiController]
    public class VideoDataController : ControllerBase
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

        public VideoDataController(IConfiguration config, VideoService videoService)
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


        [HttpPost("get")]
        public ExecutionResult<ListVideoResult> Get([FromBody]IEnumerable<string> videoId)
        {
            string[] videoIds = videoId as string[] ?? videoId.ToArray();
            List<Video> videoData = _videoService.Get(videoIds);
            string[] items = videoData.Select(v => v.Id).ToArray();
            string[] missingItems = videoIds.Except(items).ToArray();
            return ExecutionResult<ListVideoResult>.Success(new ListVideoResult
            {
                videos = videoData,
                noRecord = missingItems
            }, 1);
        }

        [HttpGet("search")]
        public ExecutionResult<List<Video>> Get([FromQuery]MetadataUserQuery query)
        {
            if (query.Start < 0)
            {
                Response.StatusCode = 400;
                return ExecutionResult<List<Video>>.Fail(ErrorCode.InvalidParameters, "Query Parameter 'start' must be greater or equal to 0");
            }

            if (query.Limit is < 1 or > 50)
            {
                Response.StatusCode = 400;
                return ExecutionResult<List<Video>>.Fail(ErrorCode.InvalidParameters, "Query Parameter 'limit' must be between 1 to 50");
            }

            MetadataDatabaseQuery databaseQuery = query.BuildDatabaseQuery();

            try
            {
                var result = _videoService.Get(databaseQuery.QueryFilterDefinition, databaseQuery.Start,
                    databaseQuery.Limit);
                return ExecutionResult<List<Video>>.Success(result, result.Count);
            }
            catch (System.OperationCanceledException)
            {
                Response.StatusCode = 400;
                return ExecutionResult<List<Video>>.Fail(ErrorCode.OperationTimeout, 
                    $"Database Query Timeout ({_videoService.QueryTimeout}ms). Try specifying Channel ID and time range, or simplify regular expressions used in the query");
            }
        }

        [HttpGet("search/count")]
        public ExecutionResult<SearchCountResult> CountResult([FromQuery] MetadataUserQuery query)
        {
            MetadataDatabaseQuery databaseQuery = query.BuildDatabaseQuery();

            long totalDocuments;
            try
            {
                totalDocuments = _videoService.Count(databaseQuery.QueryFilterDefinition);
            }
            catch (System.OperationCanceledException)
            {
                Response.StatusCode = 400;
                return ExecutionResult<SearchCountResult>.Fail(ErrorCode.OperationTimeout,
                    $"Database Query Timeout ({_videoService.QueryTimeout}ms). Try specifying Channel ID and time range, or simplify regular expressions used in the query");
            }

            return ExecutionResult<SearchCountResult>.Success(new SearchCountResult()
            {
                documents = totalDocuments,
                responseLimit = this._videoService.MaxQueryResult
            }, 1);
        }

        [HttpGet("search/export")]
        public ExecutionResult<List<Video>> Export([FromQuery] MetadataUserQuery query)
        {
            MetadataDatabaseQuery databaseQuery = query.BuildDatabaseQuery();

            long totalDocuments;
            try
            {
                totalDocuments = _videoService.Count(databaseQuery.QueryFilterDefinition);
            }
            catch (System.OperationCanceledException)
            {
                Response.StatusCode = 400;
                return ExecutionResult<List<Video>>.Fail(ErrorCode.OperationTimeout, 
                    $"Database Query Timeout ({_videoService.QueryTimeout}ms). Try specifying Channel ID and time range, or simplify regular expressions used in the query");
            }

            if (totalDocuments > _videoService.MaxQueryResult)
            {
                Response.StatusCode = 403;
                return ExecutionResult<List<Video>>.Fail(ErrorCode.TooManyItemRequested,
                    $"The query will yield more than {_videoService.MaxQueryResult} (Limit) results. Please narrow the query to include less results");
            }

            List<Video> videos;
            try
            {
                videos = _videoService.GetAll(databaseQuery.QueryFilterDefinition);
            }
            catch (System.OperationCanceledException)
            {
                Response.StatusCode = 400;
                return ExecutionResult<List<Video>>.Fail(ErrorCode.OperationTimeout,
                    $"Database Query Timeout ({_videoService.QueryTimeout}ms). Try specifying Channel ID and time range, or simplify regular expressions used in the query");
            }

            return ExecutionResult<List<Video>>.Success(videos, totalDocuments);
        }

        [HttpPost("add")]
        public ExecutionResult<AddVideoResult> Post([FromBody] IEnumerable<string> videoList)
        {
            string[] videoIds = videoList as string[] ?? videoList.ToArray();

            string[] videosMissing = _videoService.GetNonExistingVideos(videoIds);

            BackupVideoResult result = this.BackupVideos(videosMissing);

            var response = new AddVideoResult
            {
                TotalItemProcessed = videoIds.Length, 
                TotalNewItemsAdded = result.VideosAdded.Count,
                TotalItemsFailedToAdd = result.VideosFailed.Count,
                AddedVideoIds = result.VideosAdded,
                FailedVideoIds = result.VideosFailed
            };

            return ExecutionResult<AddVideoResult>.Success(response, 1);
        }

        [HttpPost("queue")]
        public ExecutionResult<QueueVideoResult> Post([FromBody] string video)
        {
            if (!ValidationUtils.ValidateYoutubeVideoId(video))
            {
                Response.StatusCode = 400;
                return ExecutionResult<QueueVideoResult>.Fail(ErrorCode.InvalidParameters, "Invalid VideoID");
            }

            if (this._videoService.Exists(video))
                return ExecutionResult<QueueVideoResult>.Success(
                    new QueueVideoResult(video, false, QueuedVideos.Count, false, true), 1);

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
