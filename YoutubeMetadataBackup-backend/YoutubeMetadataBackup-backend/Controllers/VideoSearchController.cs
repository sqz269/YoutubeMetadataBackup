#nullable enable
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using YoutubeMetadataBackup_backend.Models.api;
using YoutubeMetadataBackup_backend.Services;
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

    [EnableCors("AllowAll")]
    [Route("api/youtube/videos/data/search")]
    [ApiController]
    public class VideoSearchController : ControllerBase
    {
        private readonly VideoService _videoService;

        public VideoSearchController(VideoService videoService)
        {
            _videoService = videoService;
        }

        [HttpGet]
        public ExecutionResult<List<Video>> SearchVideos([FromQuery]MetadataUserQuery query)
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

        [HttpGet("count")]
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

        [HttpGet("export")]
        public ExecutionResult<List<Video>> ExportResult([FromQuery] MetadataUserQuery query)
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
    }
}
