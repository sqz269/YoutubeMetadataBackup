using System.Collections.Generic;

namespace YoutubeMetadataBackup_backend.Models.api
{
    public class ListVideoResult
    {
        public IEnumerable<Video> videos { get; set; }
        public IEnumerable<string> noRecord { get; set; }

    }
}