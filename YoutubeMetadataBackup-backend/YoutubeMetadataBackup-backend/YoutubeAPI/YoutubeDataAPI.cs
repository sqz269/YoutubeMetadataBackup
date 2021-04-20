using System;
using System.Collections.Generic;
using Google.Apis.Services;
using Google.Apis.YouTube.v3;
using Google.Apis.YouTube.v3.Data;
using Video = YoutubeMetadataBackup_backend.Models.api.Video;

namespace YoutubeMetadataBackup_backend.YoutubeAPI
{
    public class YoutubeDataAPI
    {
        private readonly YouTubeService youtubeApi;
        public YoutubeDataAPI(string apiKey)
        {
            youtubeApi = new YouTubeService(new BaseClientService.Initializer()
            {
                ApiKey = apiKey
            });
        }

        public VideoListResponse GetVideoDetails(string videoId)
        {
            return this.GetVideoDetails(new string[] {videoId});
        }

        public VideoListResponse GetVideoDetails(IEnumerable<string> videoIds)
        {
            // TODO: 50 IS THE MAX NUMBER OF VIDEOS TO LIST IN A SINGLE REQUEST,
            // WILL RESULT IN ERROR IF EXCEEDS THIS NUMBER
            var request = youtubeApi.Videos.List("snippet");
            var requestIds = String.Join(",", videoIds);
            request.Id = requestIds;
            return request.Execute();
        }
    }

    public static class YoutubeAPIResponseExtension
    {
        public static Video[] ToDatabaseVideo(this VideoListResponse response)
        {
            Video[] videos = new Video[response.Items.Count];
            if (response.Items.Count == 0)
            {
                return videos;
            }

            int index = 0;
            foreach (Google.Apis.YouTube.v3.Data.Video item in response.Items)
            {
                var publishedTime = item.Snippet.PublishedAt != null
                    ? ((DateTimeOffset) item.Snippet.PublishedAt).ToUnixTimeSeconds()
                    : 0;

                videos[index] = new Video(item.Id, item.Snippet.Title, item.Snippet.Description, publishedTime,
                    item.Snippet.ChannelTitle, item.Snippet.ChannelId, true);

                index++;
            }

            return videos;
        }
    }
}