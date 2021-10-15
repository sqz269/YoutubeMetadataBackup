import ExecutionResult = MetadataBackup.Response.ExecutionResult;
import VideoAddResult = MetadataBackup.Response.VideoAddResult;
import VideoListResult = MetadataBackup.Response.VideoListResult;
import SearchQuery = MetadataBackup.Request.SearchQuery;
import SearchCountResult = MetadataBackup.Response.SearchCountResult;
import VideoMetadata = MetadataBackup.Response.VideoMetadata;

export namespace MetadataBackup.Request {
    export interface SearchQuery {
        [key: string] : string
        title: string,
        description: string,
        uploader: string,
        uploaderId: string,
        timeStart: string,
        timeEnd: string
    }
}

export namespace MetadataBackup.Response {
    export interface ExecutionResult<ResultType> {
        error: boolean;
        errorCode: number;
        errorMessage: string;
        response: ResultType;
        count: number;
    }

    export interface SearchCountResult {
        documents: number,
        responseLimit: number,
        limitExceeded: boolean
    }
    
    export interface VideoMetadata {
        id: string;
        title: string;
        description: string;
        published: number;
        uploader: string;
        uploaderId: string;
        authentic: boolean;
    }

    export interface VideoAddResult {
        totalItemProcessed: number;
        totalNewItemsAdded: number;
        totalItemsFailedToAdd: number;
        addedVideoIds: string[];
        failedVideoIds: string[];
    }

    export interface VideoListResult {
        videos: VideoMetadata[],
        noRecord: string[]
    }
}

export class MetadataBackup
{
    public static EndPointDomain = "";
    public static EndPointUrl = {
        add: "/api/youtube/videos/add",
        fetch: "/api/youtube/videos/get",
        search: "/api/youtube/videos/search/",
        limit: "/api/youtube/videos/search/count",
        download: "/api/youtube/videos/search/export"
    };

    static BackupVideos(videoIds: string[],
                                 callback: (response: ExecutionResult<VideoAddResult>) => unknown) : void
    {
        const endpoint = `${this.EndPointDomain}${this.EndPointUrl.add}`
        const xhr = new XMLHttpRequest();
        xhr.open("POST", endpoint);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                const response = JSON.parse(xhr.responseText);
                callback(response as ExecutionResult<VideoAddResult>);
            }
        }
        xhr.send(JSON.stringify(videoIds));
    }

    static RetrieveListOfVideos(videoIds: string[],
                                 callback: (response: ExecutionResult<VideoListResult>) => unknown): void
    {
        const endpoint = `${this.EndPointDomain}${this.EndPointUrl.fetch}`
        const xhr = new XMLHttpRequest();
        xhr.open("POST", endpoint);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            const response = JSON.parse(xhr.responseText);
            callback(response as ExecutionResult<VideoListResult>);
            }
        }
        xhr.send(JSON.stringify(videoIds));
    }

    private static ConstructQuery(query: SearchQuery): string
    {
        const queryParams = new URLSearchParams(query);
        const keysToDel: string[] = [];

        const dateKeys = ["timeStart", "timeEnd"];
        queryParams.forEach(((value, key) => {
            if (value === "")
                keysToDel.push(key);

            if (dateKeys.includes(key) && !isFinite(parseInt(value)))
                keysToDel.push(key)
        }))

        keysToDel.forEach(value => {
            queryParams.delete(value);
        })

        return queryParams.toString();
    }

    static SearchVideos(query: SearchQuery,
                        callback: (response: ExecutionResult<VideoMetadata[]>) => unknown): void
    {
        const queryParams = this.ConstructQuery(query);
        const endpoint = `${this.EndPointDomain}${this.EndPointUrl.search}?${queryParams}`;

        const xhr = new XMLHttpRequest();
        xhr.open("GET", endpoint);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                const response = JSON.parse(xhr.responseText);
                callback(response as ExecutionResult<VideoMetadata[]>);
            }
        }
        xhr.send();
    }

    static CountQueryResult(query: SearchQuery,
                            callback: (response: ExecutionResult<SearchCountResult>, exportUrl: string) => unknown): void
    {
        const reqUrls = this.GetCountAndExportQueryUrl(query);
        const endpoint = reqUrls.count;

        const xhr = new XMLHttpRequest();
        xhr.open("GET", endpoint);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                const response = JSON.parse(xhr.responseText);
                callback(response, reqUrls.export);
            }
        }
        xhr.send();
    }
    
    static GetCountAndExportQueryUrl(query: SearchQuery): {count: string, export: string}
    {
        const queryParams = this.ConstructQuery(query);
        return {
            count: `${this.EndPointDomain}${this.EndPointUrl.limit}?${queryParams}`,
            export: `${this.EndPointDomain}${this.EndPointUrl.download}?${queryParams}`
        }
    }
}
