using System;
using MongoDB.Driver;
using YoutubeMetadataBackup_backend.Models.api;
using YoutubeMetadataBackup_backend.Models.database;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using Microsoft.EntityFrameworkCore;


namespace YoutubeMetadataBackup_backend.Services
{
    public class VideoService
    {
        private readonly IMongoCollection<Video> _videos;
        public readonly int QueryTimeout;
        public readonly long MaxQueryResult;

        public VideoService(IVideoDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _videos = database.GetCollection<Video>(settings.VideoCollectionsName);
            QueryTimeout = settings.QueryTimeoutMilliseconds;
            MaxQueryResult = settings.MaxQueryResult;
        }

        public List<Video> Get(string[] ids)
        {
            var filter = new FilterDefinitionBuilder<Video>().In(v => v.Id, ids);
            return _videos.Find(filter).ToList();
        }

        public List<Video> Get(FilterDefinition<Video> filter, int start, int limit)
        {
            using (var timeout = new CancellationTokenSource(TimeSpan.FromMilliseconds(QueryTimeout)))
            {
                return _videos.Find(filter).Skip(start).Limit(limit).ToList(timeout.Token);
            }
        }

        public List<Video> GetAll(FilterDefinition<Video> filter)
        {
            using (var timeout = new CancellationTokenSource(TimeSpan.FromMilliseconds(QueryTimeout)))
            {
                return _videos.Find(filter).ToList(timeout.Token);
            }
        }

        public void Create(Video video)
        {
            _videos.InsertOne(video);
        }

        public void Create(IEnumerable<Video> videos)
        {
            _videos.InsertMany(videos);
        }

        public long Count(FilterDefinition<Video> filter)
        {
            using (var timeout = new CancellationTokenSource(TimeSpan.FromMilliseconds(QueryTimeout)))
            {
                return _videos.Find(filter).CountDocuments(timeout.Token);
            }
        }

        public string[] GetNonExistingVideos(string[] videos)
        {
            var filter = new FilterDefinitionBuilder<Video>().In(v => v.Id, videos);
            var existingVideos = _videos.Find(filter).Project(video => video.Id).ToList();
            return videos.Except(existingVideos).ToArray();
        }

        public bool Exists(Video vid)
        {
            return _videos.Find(video => video.Id == vid.Id).CountDocuments() > 0;
        }

        public bool Exists(string videoId)
        {
            return _videos.Find(video => video.Id == videoId).CountDocuments() > 0;
        }

        public Video Update(string id, Video newVideo)
        {
            _videos.ReplaceOne(video => video.Id == id, newVideo);
            return newVideo;
        }
    }
}