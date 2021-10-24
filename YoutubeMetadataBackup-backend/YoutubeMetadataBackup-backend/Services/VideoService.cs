using System;
using MongoDB.Driver;
using YoutubeMetadataBackup_backend.Models.api;
using YoutubeMetadataBackup_backend.Models.database;
using System.Collections.Generic;
using System.Linq;
using System.Threading;


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

        public void Create(IEnumerable<Video> videos, bool ignoreError=false)
        {
            _videos.InsertMany(videos, new InsertManyOptions
            {
                IsOrdered = !ignoreError
            });
        }

        public long Count(FilterDefinition<Video> filter)
        {
            using (var timeout = new CancellationTokenSource(TimeSpan.FromMilliseconds(QueryTimeout)))
            {
                return _videos.Find(filter).CountDocuments(timeout.Token);
            }
        }

        public (IEnumerable<string> existing, IEnumerable<string> missing) GetNonExistingVideos(string[] videos)
        {
            
            var filter = new FilterDefinitionBuilder<Video>().In(v => v.Id, videos);
            var existingVideos = _videos.Find(filter).Project(video => video.Id).ToList();
            var missing = videos.Except(existingVideos).ToArray();
            return (existingVideos, missing);
        }

        public void IncBackupCount(string videoId)
        {
            this.IncBackupCount(new []{videoId});
        }

        public void IncBackupCount(IEnumerable<string> videos)
        {
            //var query = Builders<Video>.Filter.Eq();
            var filter = new FilterDefinitionBuilder<Video>().In(v => v.Id, videos);
            var update = Builders<Video>.Update.Inc(nameof(Video.BackupCount), 1);

            _videos.UpdateMany(filter, update);
        }

        public bool Exists(string videoId)
        {
            return _videos.Find(video => video.Id == videoId).CountDocuments() > 0;
        }
    }
}