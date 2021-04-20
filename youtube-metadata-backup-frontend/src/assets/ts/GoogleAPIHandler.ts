import {Utils} from "@/assets/ts/Utils";

export class GoogleAPIHandler
{
    private apiKey: string;
    private clientId: string;

    private static _instance: GoogleAPIHandler;

    isAuthAPIReady: boolean = false;
    isYoutubeDataAPIReady: boolean = false;

    auth: (gapi.auth2.GoogleAuth | undefined);

    private constructor()
    {
        this.apiKey = Utils.GetCookie("apiKey") || "";
        this.clientId = Utils.GetCookie("apiKey") || "";
    }

    public setAPIKey(key: string)
    {
        this.isYoutubeDataAPIReady = false;
        this.apiKey = key;
    }

    public setClientId(id: string)
    {
        this.isAuthAPIReady = false;
        this.clientId = id;
    }

    public LoadAuthAPI(callback: (error: boolean, reason: {error: string, details: string}) => any)
    {
        const that = this;
        gapi.auth2.init({client_id: this.clientId}).then(
            function(auth: gapi.auth2.GoogleAuth)
            {
                that.isAuthAPIReady = true;
                that.auth = auth;
                callback(false, {error: "Success", details: "Operation Completed Successfully"})
            },
            function(reason)
            {
                that.isAuthAPIReady = false;
                console.error(`Failed to load Auth API: ${reason.details}`);
                callback(true, reason);
            }
        );
    }

    public Authorize(callback: (error: boolean, message: {error: string, details: string}) => any)
    {
        if (!this.isAuthAPIReady || !this.auth)
        {
            console.error("Unable to open signin window, auth api not loaded. Call LoadAuthAPI before calling Authorize");
            callback(true, {error: "API Not Loaded", details: "Unable to open signin window, auth api not loaded. Call LoadAuthAPI before calling Authorize"});
        }

        const that = this;
        // @ts-ignore
        this.auth.signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"}).then(
            function()
            {
                that.isAuthAPIReady = true;
                callback(false, {error: "Success", details: "Operation Completed Successfully"})
            },
            function (reason: any)
            {
                that.isAuthAPIReady = false;
                console.error(`Error when Signing In, Reason: ${reason.error}`);
                callback(true, reason);
            }
        );
    }

    public LoadYoutubeAPI(callback: (error: boolean, message: any) => any)
    {
        if (!this.apiKey)
        {
            console.log("No API Key Specificed");
            callback(true, "ERROR: No API Key Specified")
        }

        const that = this;
        gapi.client.setApiKey(this.apiKey);
        gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest", "v3").then(
            function()
            {
                that.isYoutubeDataAPIReady = true;
                console.log("Youtube Data API Ready");
                callback(false, "Youtube API Loaded");
            },
            function (reason)
            {
                that.isYoutubeDataAPIReady = false;
                callback(false, "Failed to load Youtube API");
                console.error(`Failed to load API, Reason: ${reason.error.message}`);
            }
        );
    }

    public static GetInstance()
    {
        return this._instance || (this._instance = new this());
    }
}