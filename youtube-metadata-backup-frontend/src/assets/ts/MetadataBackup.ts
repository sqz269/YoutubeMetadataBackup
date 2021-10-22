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
    public static EndPointDomain = "";
    public static EndPointUrl = {
        add: "/api/youtube/videos/backup/add",
        search: "/api/youtube/videos/data/search"
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
}
