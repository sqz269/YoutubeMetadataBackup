namespace YoutubeMetadataBackup_backend.Models.api
{
    public class QueueVideoResult
    {
        public string VideoId { get; set; }
        public bool Queued { get; set; }
        public int TotalInQueue { get; set; }
        public bool QueueProcessed { get; set; }
        public bool Exists { get; set; }

        public QueueVideoResult(string videoId, bool queued, int totalInQueue, bool queueProcessed, bool exists)
        {
            this.VideoId = videoId;
            this.Queued = queued;
            this.TotalInQueue = totalInQueue;
            this.QueueProcessed = queueProcessed;
            this.Exists = exists;
        }
    }
}