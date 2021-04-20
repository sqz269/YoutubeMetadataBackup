using System.Collections.Generic;

namespace YoutubeMetadataBackup_backend.Models.api
{
    public class AddVideoResult
    {
        public int TotalItemProcessed { get; set; }
        public int TotalNewItemsAdded { get; set; }
        public int TotalItemsFailedToAdd { get; set; }
        public List<string> AddedVideoIds { get; set; }
        public List<string> FailedVideoIds { get; set; }
    }
}