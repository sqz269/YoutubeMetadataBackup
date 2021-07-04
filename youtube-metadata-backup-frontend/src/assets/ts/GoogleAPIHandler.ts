import {Utils} from "@/assets/ts/Utils";

export class GoogleAPIHandler {
    private static _instance: GoogleAPIHandler;

    private auth: (gapi.auth2.GoogleAuth | undefined);

    private apiKey: string;
    get APIKey(): string {
        return this.apiKey;
    }
    set APIKey(value: string) {
        this.apiKey = value;
    }

    private clientId: string;
    get ClientId(): string {
        return this.clientId;
    }
    set ClientId(value: string) {
        this.clientId = value;
    }

    private isAuthAPIReady = false;
    get IsAuthAPIReady() : boolean {
        return this.isAuthAPIReady;
    }

    private isYoutubeDataAPIReady = false;
    get IsYoutubeDataAPIReady() : boolean {
        return this.isYoutubeDataAPIReady;
    }

    private constructor() {
        this.apiKey = Utils.GetCookie("apiKey") || "";
        this.clientId = Utils.GetCookie("clientId") || "";
    }

    public LoadAPI() {
        gapi.load("client:auth2", () => {
            this.LoadYoutubeAPI(() => {console.log("Youtube Data API Ready;")});
        });
    }

    public static GetInstance(): GoogleAPIHandler {
        return this._instance || (this._instance = new this());
    }

    public LoadAuthAPI(callback: (error: boolean, reason: { error: string, details: string }) => unknown): void {
        gapi.auth2.init({client_id: this.clientId}).then(
            (auth: gapi.auth2.GoogleAuth) => {
                this.isAuthAPIReady = true;
                this.auth = auth;
                callback(false, {error: "Success", details: "Operation Completed Successfully"})
            },
            (reason) => {
                this.isAuthAPIReady = false;
                console.error(`Failed to load Auth API: ${reason.details}`);
                callback(true, reason);
            }
        );
    }

    public Authorize(callback: (error: boolean, message: { error: string, details: string }) => unknown): void {
        if (!this.isAuthAPIReady || !this.auth) {
            console.error("Unable to open signin window, auth api not loaded. Call LoadAuthAPI before calling Authorize");
            callback(true, {
                error: "API Not Loaded",
                details: "Unable to open signin window, auth api not loaded. Call LoadAuthAPI before calling Authorize"
            });
            return;
        }

        this.auth.signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"}).then(
            () => {
                this.isAuthAPIReady = true;
                callback(false, {error: "Success", details: "Operation Completed Successfully"})
            },
            (reason: any) => {
                this.isAuthAPIReady = false;
                console.error(`Error when Signing In, Reason: ${reason.error}`);
                callback(true, reason);
            }
        );
    }

    public LoadYoutubeAPI(callback: (error: boolean, message: string) => unknown): void {
        if (!this.apiKey) {
            console.log("No API Key Specified");
            callback(true, "ERROR: No API Key Specified")
        }

        gapi.client.setApiKey(this.apiKey);
        gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest", "v3").then(
            () => {
                this.isYoutubeDataAPIReady = true;
                console.log("Youtube Data API Ready");
                callback(false, "Youtube API Loaded");
            },
            (reason) => {
                this.isYoutubeDataAPIReady = false;
                console.error(`Failed to load API, Reason: ${reason.error.message}`);
                callback(true, reason.error.message);
            }
        );
    }
}