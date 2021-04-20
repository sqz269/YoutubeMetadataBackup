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
                                       callback: (items: gapi.client.youtube.PlaylistItem[]) => any,
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
                    callback(fetchedItems);
                }
            },
            function(err)
            {
                console.error(`Error fetching playlist: ${err.result.error.message}`);
            }
        )
    }
}