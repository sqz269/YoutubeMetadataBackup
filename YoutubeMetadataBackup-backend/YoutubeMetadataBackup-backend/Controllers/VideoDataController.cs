using System;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Security;
using Google.Apis.YouTube.v3.Data;
using Microsoft.AspNetCore.Cors;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using YoutubeMetadataBackup_backend.Models.api;
using YoutubeMetadataBackup_backend.Models.database;
using YoutubeMetadataBackup_backend.Services;
using YoutubeMetadataBackup_backend.YoutubeAPI;
using Video = YoutubeMetadataBackup_backend.Models.api.Video;

namespace YoutubeMetadataBackup_backend.Controllers
{
    [EnableCors("AllowAll")]
    [Route("api/youtube/videos")]
    [ApiController]
    public class VideoDataController : ControllerBase
    {
        private readonly VideoService _videoService;
        private readonly YoutubeDataAPI _youtubeDataApi;
        private readonly List<string> _apiKeys = new List<string>();

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
            });
        }

        [HttpGet("get/all")]
        public ExecutionResult<List<Video>> Get([FromQuery]int start = 0, [FromQuery]int limit = 20)
        {
            if (start < 0)
            {
                Response.StatusCode = 400;
                return ExecutionResult<List<Video>>.Fail(ErrorCode.InvalidParamaters, "Query Parameter 'start' must be greater or equal to 0");
            }

            if (limit < 1 || limit > 50)
            {
                Response.StatusCode = 400;
                return ExecutionResult<List<Video>>.Fail(ErrorCode.InvalidParamaters, "Query Parameter 'limit' must be between 1 to 50");
            }

            return ExecutionResult<List<Video>>.Success(_videoService.Get(start, limit));
        }

        [HttpPost("add")]
        public ExecutionResult<AddVideoResult> Post([FromBody] IEnumerable<string> videoList)
        {
            string[] videoIds = videoList as string[] ?? videoList.ToArray();

            string[] videosMissing = _videoService.GetNonExistingVideos(videoIds);

            // Instead of 
            List<string> failedToRetrieve = new List<string>();
            List<string> videosRetrieved = new List<string>();

            List<Video> videos = new List<Video>();

            // Because of google's API Limit, we can only list up to 50 videos per request
            for (int i = 0; i < videosMissing.Length; i += 50)
            {
                var queriedItems = videosMissing.Skip(i).Take(50);
                IEnumerable<string> queryCached = queriedItems as string[] ?? queriedItems.ToArray();
                VideoListResponse responseChunk = _youtubeDataApi.GetVideoDetails(queryCached);
                Video[] videosChunk = responseChunk.ToDatabaseVideo();

                if (queryCached.Count() > responseChunk.Items.Count)
                {
                    string[] fetchItems = videosChunk.Select(v => v.Id).ToArray();
                    foreach (string id in queryCached.Except(fetchItems))
                    {
                        failedToRetrieve.Add(id);
                    }
                }

                // Map the chunk response to the array that is going to contain all the collected videos
                foreach (Video video in videosChunk)
                {
                    videos.Add(video);
                    videosRetrieved.Add(video.Id);
                }
            }
            
            if (videos.Count != 0)
                this._videoService.Create(videos);

            var result = new AddVideoResult
            {
                TotalItemProcessed = videoIds.Length, 
                TotalNewItemsAdded = videos.Count,
                TotalItemsFailedToAdd = failedToRetrieve.Count,
                AddedVideoIds = videosRetrieved,
                FailedVideoIds = failedToRetrieve
            };
            return ExecutionResult<AddVideoResult>.Success(result);
        }
    }
}
