export module YoutubeDataAPIHandler {
    export function GetPlaylistDetails(playlistId: string, pageToken: string="", parts: string[]=["snippet"]):
            gapi.client.Request<gapi.client.youtube.PlaylistItemListResponse>
    {
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
                                                  items: gapi.client.youtube.PlaylistItem[]) => any,
                                       iterCallback?: (fetched: number, total: number) => any,
                                       fetchedItems: gapi.client.youtube.PlaylistItem[]=[],
                                       pageId: (string | undefined)=undefined): void
    {
        // let fetchedItems: gapi.client.youtube.PlaylistItem[] = [];
        // let respPageId: (string | undefined);

        GetPlaylistDetails(playlistId, pageId).then(
            function(resp)
            {
                pageId = resp.result.nextPageToken;
                if (!resp.result.items)
                {
                    console.log("No Items in the result set??");
                }
                else
                {
                    fetchedItems.push(...resp.result.items);
                }

                if (resp.result.pageInfo?.totalResults && iterCallback)
                    iterCallback(fetchedItems.length, resp.result.pageInfo?.totalResults);

                if (pageId)
                {
                    FetchPlaylistItems(playlistId, callback, iterCallback, fetchedItems, pageId);
                }
                else
                {
                    callback(false, "Success", fetchedItems);
                }
            },
            function(err)
            {
                callback(true, err.result.error.message, fetchedItems);
            }
        )
    }

    // Youtube API Also allows us to get the upload playlist by usernames
    // but for now, we'll only accept channel id
    export function GetChannelUploadPlaylist(channelId: string,
                                             callback: (error: boolean,
                                                        errorReason: string,
                                                        data: (string | undefined)) => any)
    {
        gapi.client.youtube.channels.list({
            "part": ["snippet,contentDetails,statistics"],
            "id": [channelId]
        }).then(
            function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);

                // @ts-ignore
                let playlistId = response.result.items[0].contentDetails.relatedPlaylists.uploads;

                callback(false, "Success", playlistId);
            },
            function(err) {
                console.error("Error", err);
                callback(true, err.result.error.message, undefined);
            }
        );
    }
}
