using System.Collections.Generic;

namespace YoutubeMetadataBackup_backend.Models.api
{
    public class VideoList
    {
        public IEnumerable<Video> VideoData { get; set; }
    }
}