using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using YoutubeMetadataBackup_backend.Models.api;
using YoutubeMetadataBackup_backend.Services;

namespace YoutubeMetadataBackup_backend.Controllers
{
    [EnableCors("AllowAll")]
    [Route("api/youtube/videos/data/get")]
    [ApiController]
    public class VideoDataController
    {
        private readonly VideoService _videoService;

        public VideoDataController(VideoService videoService)
        {
            _videoService = videoService;
        }

        [HttpGet]
        [HttpPost]
        public ExecutionResult<ListVideoResult> GetVideosFromId(IEnumerable<string> videoId)
        {
            var videoIds = videoId as string[] ?? videoId.ToArray();
            var videoData = _videoService.Get(videoIds);
            var items = videoData.Select(v => v.Id).ToArray();
            var missingItems = videoIds.Except(items).ToArray();
            return ExecutionResult<ListVideoResult>.Success(new ListVideoResult
            {
                videos = videoData,
                noRecord = missingItems
            }, 1);
        }
    }
}