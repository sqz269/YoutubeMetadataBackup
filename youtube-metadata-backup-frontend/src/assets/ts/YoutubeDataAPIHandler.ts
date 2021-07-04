export module YoutubeDataAPIHandler {
    export function GetPlaylistDetails(playlistId: string, pageToken="", parts: string[]=["snippet"]):
        gapi.client.Request<gapi.client.youtube.PlaylistItemListResponse> {
        return gapi.client.youtube.playlistItems.list({
            "part": parts,
            "maxResults": 50,
            "pageToken": pageToken,
            "playlistId": playlistId
        });
    }

    export function FetchPlaylistItems(playlistId: string,
                                       callback: (error: boolean,
                                                  errorReason: string,
                                                  items: gapi.client.youtube.PlaylistItem[]) => unknown,
                                       iterCallback?: (fetched: number, total: number) => unknown,
                                       fetchedItems: gapi.client.youtube.PlaylistItem[] = [],
                                       pageId: (string | undefined) = undefined): void {
        // let fetchedItems: gapi.client.youtube.PlaylistItem[] = [];
        // let respPageId: (string | undefined);

        GetPlaylistDetails(playlistId, pageId).then(
            function (resp) {
                pageId = resp.result.nextPageToken;
                if (!resp.result.items) {
                    console.log("No Items in the result set??");
                } else {
                    fetchedItems.push(...resp.result.items);
                }

                if (resp.result.pageInfo?.totalResults && iterCallback)
                    iterCallback(fetchedItems.length, resp.result.pageInfo?.totalResults);

                if (pageId) {
                    FetchPlaylistItems(playlistId, callback, iterCallback, fetchedItems, pageId);
                } else {
                    callback(false, "Success", fetchedItems);
                }
            },
            function (err) {
                callback(true, err.result.error.message, fetchedItems);
            }
        )
    }

    export function GetChannelDetailsFromUsername(username: string,
                                                  callback: (error: boolean,
                                                      errorReason: string,
                                                      data: gapi.client.youtube.Channel[]) => unknown): void
    {
        gapi.client.youtube.channels.list({
            part: ["snippet,contentDetails,statistics"],
            forUsername: username
        }).then(
            (response) => {
                if (!response.result.items)
                    callback(false, "Success", []);
                else
                    callback(false, "Success", response.result.items);
            },
            (err) => {
                callback(true, err.result.error.message, []);
            }
        )
    }

    export function GetChannelIdFromVideo(videoId: string,
                                          callback: (error: boolean,
                                                     errorReason: string,
                                                     data: string | undefined) => unknown): void
    {
        gapi.client.youtube.videos.list({
            "part": ["snippet,contentDetails,statistics"],
            "id": videoId
        }).then(
        (response) => {
            if (response.result.items)
            {
                callback(false, "Success", response.result.items[0].snippet?.channelId);
            }
            else
            {
                callback(false, "Success", undefined);
            }
        },
        (reason) => {
            callback(true, reason, undefined);
        });
    }

    // Youtube API Also allows us to get the upload playlist by usernames
    // but for now, we'll only accept channel id
    export function GetChannelUploadPlaylist(channelId: string,
                                             callback: (error: boolean,
                                                        errorReason: string,
                                                        data: (string | undefined)) => unknown): void {
        gapi.client.youtube.channels.list({
            "part": ["snippet,contentDetails,statistics"],
            "id": [channelId]
        }).then(
            function (response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);

                if (!response.result.items)
                {
                    callback(true, "Youtube Data API did not respond with a Upload playlist.", undefined);
                    return;
                }

                const playlistId = response.result.items[0].contentDetails?.relatedPlaylists?.uploads;

                callback(false, "Success", playlistId);
            },
            function (err) {
                console.error("Error", err);
                callback(true, err.result.error.message, undefined);
            }
        );
    }
}
