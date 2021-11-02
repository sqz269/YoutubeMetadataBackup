import ExecutionResult = MetadataBackup.Response.ExecutionResult;
import VideoAddResult = MetadataBackup.Response.VideoAddResult;
import VideoListResult = MetadataBackup.Response.VideoListResult;

export namespace MetadataBackup.Response {
    export interface ExecutionResult<ResultType> {
        error: boolean;
        errorCode: number;
        errorMessage: string;
        response: ResultType;
        count: number;
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

export class MetadataBackup {
    public static EndPointDomain = "https://api.backup.marisad.me";
    public static EndPointUrl = {
        add: "/api/youtube/videos/backup/add",
        queue: "/api/youtube/videos/backup/queue",
        fetch: "/api/youtube/videos/data/get",
        search: "/api/youtube/videos/data/search",
    };

    private static FetchResource<Type>(url: string, data: (string | null), 
                                        callback: (httpError: boolean, errorReason: (string | null), 
                                                    result: (ExecutionResult<Type> | null)) => unknown,
                                        method="POST") {
        fetch(url, {
                method: method,
                body: data,
                headers: { "Content-Type": "application/json" }
            }).then(resp => 
                {
                    resp.json().then(json => 
                        {
                            callback(false, null, json as ExecutionResult<Type>);
                        }).catch(reason => 
                        {
                            callback(true, reason, null);
                        });
                }).catch(reason => {
                    callback(true, reason, null);
            });
    }
    
    public static BackupVideos(videoIds: string[],
                        callback: (httpError: boolean, reason: (string | null), 
                            response: (ExecutionResult<VideoAddResult> | null)) => unknown) : void
    {
        const endpoint = `${this.EndPointDomain}${this.EndPointUrl.add}`
        this.FetchResource<VideoAddResult>(endpoint, JSON.stringify(videoIds), callback);
    }

    public static RetrieveListOfVideos(videoIds: string[],
                                callback: (httpError: boolean, reason: (string | null), 
                                response: (ExecutionResult<VideoListResult> | null)) => unknown) : void
    {
        const endpoint = `${this.EndPointDomain}${this.EndPointUrl.fetch}`
        this.FetchResource<VideoListResult>(endpoint, JSON.stringify(videoIds), callback);
    }
}
