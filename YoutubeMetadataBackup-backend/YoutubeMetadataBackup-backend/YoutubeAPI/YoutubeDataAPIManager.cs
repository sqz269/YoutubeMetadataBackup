using System.Collections.Generic;
using System.Linq;

namespace YoutubeMetadataBackup_backend.YoutubeAPI
{
    public class YoutubeDataAPIManager
    {
        private readonly List<YoutubeDataAPI> youtubeDataApis = new List<YoutubeDataAPI>();
        private readonly List<YoutubeDataAPI> available = new List<YoutubeDataAPI>();
        private readonly List<YoutubeDataAPI> quotaReached = new List<YoutubeDataAPI>();

        public YoutubeDataAPIManager(string[] apiKeys)
        {
            foreach (string apiKey in apiKeys)
            {
                youtubeDataApis.Add(new YoutubeDataAPI(apiKey));
            }
        }

        //public YoutubeDataAPI 
    }
}