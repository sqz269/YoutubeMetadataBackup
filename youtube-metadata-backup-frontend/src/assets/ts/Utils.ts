export module Utils {
    export function GetQueryParams(qs: string, name: string)
    {
        try
        {
            let url = new URL(qs);
            return url.searchParams.get(name);
        } catch (e)
        {
            return null;
        }
    }

    export function GetCookie(name: string)
    {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
    }

    export function SetCookie(name: string, value: string)
    {
        document.cookie = `${name}=${value}; expires=Fri, 31 Dec 2037 23:59:59 GMT`;
    }

    export function DetermineIdType(data: string): {type: (string | null), id: (string | null)}
    {
        // There are a number of input possibilities
        // Scenario 1: User inputs nothing
        //      This is the easiest scenario, just return null both id and type
        // Scenario 2: User inputs a playlist URL
        //      We can use the function Utils.GetQueryParams to try to extract the ?list
        //      parameter from the url, if the list parameter doesn't exist,
        //      the function with return null and ruling out this Scenario.
        //      If the list parameter did exist we just return type: "list" and id: playlist id
        // Scenario 3: User inputs a video URL
        //      See Scenario 2, but try to extract the ?v param
        // Scenario 4: User inputs an String (either video or playlist)
        //      If the input have a length of 11, then it probably is an video id
        //
        //      If the input is greater than 11, there are two possibilities,
        //      Either the input is a playlistId,
        //      OR a list of videoIds separated by commas (eg. v9LBUhyy6Z4,2sAzhGmxGHM,LdnVrSzZJK4)
        //      We split the string by comma and check if the first element have the length of 12
        //      if it does, it's probably an string of video ids, else it's a playlist id
        if (!data)
        {
            return {type: null, id: null};
        }

        let playlistId = Utils.GetQueryParams(data, "list");
        if (playlistId)
        {
            return {type: "playlist", id: playlistId};
        }

        let videoId = Utils.GetQueryParams(data, "v");
        if (videoId)
        {
            return {type: "video", id: videoId};
        }

        // Youtube video's ID is 11 characters
        if (data.length === 11)
        {
            return {type: "video", id: data};
        }
        else
        {
            if (data.split(",")[0].length === 11)
            {
                return {type: "video", id: data};
            }
            else
            {
                return {type: "playlist", id: data};
            }
        }
    }
}