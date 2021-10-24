using System;
using MongoDB.Driver;
using YoutubeMetadataBackup_backend.Models.api;

namespace YoutubeMetadataBackupDatabaseUpgrade
{
    public static class BackupCountUpdate
    {
        public static void AddBackupCountField(IMongoCollection<Video> collection)
        {
            var operation = Builders<Video>.Update.Set("BackupCount", (long)0);
            var filter = Builders<Video>.Filter.Empty;
            var options = new UpdateOptions() { IsUpsert = true };
            Console.WriteLine("Press Enter to Continue");
            Console.ReadLine();
            Console.WriteLine("Executing Changes");
            collection.UpdateMany(filter, operation, options);
            Console.WriteLine("Changes made");
        }
    }
}