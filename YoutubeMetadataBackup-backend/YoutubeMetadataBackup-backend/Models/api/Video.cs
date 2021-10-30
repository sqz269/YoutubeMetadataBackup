using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace YoutubeMetadataBackup_backend.Models.api
{
    public class Video
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public long Published { get; set; }
        public string Uploader { get; set; }
        public string UploaderId { get; set; }
        public bool Authentic { get; set; }
        public int BackupCount { get; set; }

        public Video(string id, string title, string description, long published, string uploader, string uploaderId, bool authentic, int backupCount)
        {
            Id = id;
            Title = title;
            Description = description;
            Published = published;
            Uploader = uploader;
            UploaderId = uploaderId;
            Authentic = authentic;
            BackupCount = backupCount;
        }
    }
}