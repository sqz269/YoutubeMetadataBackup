export module MetadataBackup
{
    export interface ExecutionResult<ResultType> {
        error: boolean;
        errorCode: number;
        errorMessage: string;
        response: ResultType;
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

    export function BackupVideos(endpoint: string, videoIds: string[],
                                 callback: (response: MetadataBackup.ExecutionResult<MetadataBackup.VideoAddResult>) => any)
    {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", endpoint);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE)
            {
                let response = JSON.parse(xhr.responseText);
                callback(response as ExecutionResult<VideoAddResult>);
            }
        }
        xhr.send(JSON.stringify(videoIds));
    }

    export function RetrieveListOfVideos(endpoint: string, videoIds: string[],
                                         callback: (response: MetadataBackup.ExecutionResult<MetadataBackup.VideoListResult>) => any)
    {
        // if the last char of the end point is a slash, then we don't have to append one
        let xhr = new XMLHttpRequest();
        xhr.open("POST", endpoint);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE)
            {
                let response = JSON.parse(xhr.responseText);
                callback(response as ExecutionResult<VideoListResult>);
            }
        }
        xhr.send(JSON.stringify(videoIds));
    }
}
