using System;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using YoutubeMetadataBackup_backend.Models.api;
using YoutubeMetadataBackup_backend.Models.database;
using YoutubeMetadataBackup_backend.Services;

namespace YoutubeMetadataBackupDatabaseUpgrade
{
    class Program
    {
        public static IMongoCollection<Video> GetVideoCollection(IVideoDatabaseSettings databaseSettings)
        {
            VideoService service = new VideoService(databaseSettings);
            // Get private field _vidoes using reflection magic
            IMongoCollection<Video> collection = service.GetFieldValue<IMongoCollection<Video>>("_vidoes");
            return collection;
        }

        static void Main(string[] args)
        {
            var collection = GetVideoCollection(new IVideoDatabaseSettings()
            {
                ConnectionString = "<MongoDB Connection String>",
                DatabaseName = "YoutubeMetadataBackup",
                VideoCollectionsName = "VideoData",
                QueryTimeoutMilliseconds = 100000000,
                MaxQueryResult = 50000000
            });

            BackupCountUpdate.AddBackupCountField(collection);
        }
    }
}
