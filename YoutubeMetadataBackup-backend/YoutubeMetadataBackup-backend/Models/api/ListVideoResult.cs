using System.Collections.Generic;

namespace YoutubeMetadataBackup_backend.Models.api
{
    public class ListVideoResult
    {
        public IEnumerable<Video> videos { get; set; }
        public IEnumerable<string> noRecord { get; set; }
    }

    public class SearchCountResult
    {
        public long documents { get; set; }
        public long responseLimit { get; set; }
        public bool limitExceeded => documents > responseLimit;
    }
}