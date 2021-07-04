enum IdType {
    Video,
    VideoList,
    Playlist,
    Channel,
    Username,
    CustomUrl,
    Empty,
    Unknown
}

export { IdType }

export module Utils {
    export function GetQueryParams(qs: string, name: string): string | null {
        try {
            const url = new URL(qs);
            return url.searchParams.get(name);
        } catch (e) {
            return null;
        }
    }

    export function GetCookie(name: string): string | undefined {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
    }

    export function SetCookie(name: string, value: string): void {
        document.cookie = `${name}=${value}; expires=Fri, 31 Dec 2037 23:59:59 GMT`;
    }

    export function ExportFile(content: BlobPart[], filename: string, type: {type: string}): void {
        const data = new Blob(content, type);
        const dataUrl = URL.createObjectURL(data);

        const link = document.createElement("a");
        link.setAttribute("href", dataUrl);
        link.setAttribute("download", filename);
        link.setAttribute("class", "d-none");
        document.body.appendChild(link); // Required for FF
        link.click();
        document.body.removeChild(link);
    }

    export function UnixTimestampToDateString(timestamp: number): string {
        return new Date(timestamp * 1000).toLocaleDateString();
    }

    export function DetermineIdType(data: string): { type: (IdType), id: (string | null | string[]) } {
        if (!data) {
            return {type: IdType.Empty, id: null};
        }

        const channelCustomUrl = "youtube.com/c/";
        const channelUserAltUrl = "youtube.com/user/";
        const channelIdUrl = "youtube.com/channel/";

        // Example: https://www.youtube.com/channel/UCmGMR_bG6xx9AAiPbxTr_RQ
        if (data.indexOf(channelIdUrl) != -1)
        {
            const index = data.indexOf(channelIdUrl);
            // strip the url part, we only need the things after channel
            let channelId = data.slice(index + channelIdUrl.length);
            // the split is to make sure the channel id can be properly extracted if the url
            // is on the channel's video's page, then the url would be
            // https://www.youtube.com/channel/UCmGMR_bG6xx9AAiPbxTr_RQ/videos
            // and we want to also get ride of /videos
            channelId = channelId.split("/")[0]

            return {type: IdType.Channel, id: channelId };
        }

        // Example: https://www.youtube.com/user/PhoenixUtsuho
        if (data.indexOf(channelUserAltUrl) != -1)
        {
            const index = data.indexOf(channelUserAltUrl);
            let username = data.slice(index + channelUserAltUrl.length);
            // Please see the previous comment regarding the split and index
            username = username.split("/")[0]

            return {type: IdType.Username, id: username };
        }

        // As it turns out, it's impossible to resolve /c/ url using Youtube's API
        // Source: https://stackoverflow.com/a/47288211/9844414
        // (Thanks Google & Youtube, Again,
        // for your continuous effort to invade user's privacy,
        // push out shitty features no one asked for,
        // ignore bugs and much needed features,
        // Well Done!)
        // TODO
        // One possible way to work around this is ask the user to provide video from the channel
        // and retrieve the data about the video which will contain the channel's ID
        //

        // Example: https://www.youtube.com/c/BureBuru
        if (data.indexOf(channelCustomUrl) != -1)
        {
            const index = data.indexOf(channelCustomUrl);
            let username = data.slice(index + channelCustomUrl.length);
            // Please see the previous comment regarding the split and index
            username = username.split("/")[0]

            return {type: IdType.CustomUrl, id: username };
        }

        const playlistId = Utils.GetQueryParams(data, "list");
        if (playlistId) {
            return {type: IdType.Playlist, id: playlistId};
        }

        const videoId = Utils.GetQueryParams(data, "v");
        if (videoId) {
            return {type: IdType.Video, id: videoId};
        }

        // Youtube video's ID is 11 characters
        if (data.length === 11) {
            return {type: IdType.Video, id: data};
        }

        if (data.split(",")[0].length === 11) {
            let videoIdList = data.split(",");
            videoIdList = videoIdList.filter((e) => {
                return !!e;
            });

            if (!videoIdList)
                return {type: IdType.Empty, id: null};

            return {type: IdType.VideoList, id: videoIdList};
        }

        const typeId = data.substr(0, 2);
        // PL is the regular playlist created by users (PL -> Playlist)
        // UU is a playlist created by the system that contains a list of upload of a channel (UU -> User Upload)
        // RD is a playlist generated by the system based on the users interest (RD for Radio)
        if (typeId === "PL" || typeId === "UU" || typeId === "RD") {
            return {type: IdType.Playlist, id: data};
        }

        // UC -> User Channel
        if (typeId === "UC") {
            return {type: IdType.Channel, id: data};
        }

        return {type: IdType.Unknown, id: null};
    }
}