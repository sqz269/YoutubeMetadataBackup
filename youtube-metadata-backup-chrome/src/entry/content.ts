import { MetadataBackup } from "./MetadataBackup";

enum Page {
    Other,
    Playlist,
    Video
}

enum Visibility
{
    Unknown=-1,
    Public,
    Unlisted,
    Private
}

enum ControllerType
{
    Playlist,
    Video
}

interface PlaylistItem
{
    title: string;
    videoId: string;
    uploader: (string | null);
    uploaderUrl: (string | null);
    element: Element;
}

abstract class Controllers
{
    public abstract Activate(): void;
    public abstract Deactivate(): void;
    public abstract GetType(): ControllerType;
}

class Utils
{
    /**
     * Parse an raw Element to a PlaylistItem object
     * @param element the ytd-playlist-video-renderer element to be parsed to a PlaylistItem
     * @returns the parsed PlaylistItem, uploader and uploaderUrl are null if the video is deleted
     *          CHECK STRICTLY FOR NULL FOR UPLOADER TO SEE IF THE VIDEO IS DELETED, 
     *          SOME CHANNELS WILL HAVE EMPTY NAMES
     * @throws Error if the element does not contain sub-elements: with id
     *          meta, video-title, channel-name.
     */
    public static PlaylistItemFromElement(element: Element): PlaylistItem
    {
        let metadata = element.querySelector("[id='meta']");

        if (!metadata)
            throw new Error("Could not find metadata element");

        // GET VIDEO METADAT BEGIN ------------------------------------------------------
        let titleAnchor = metadata.querySelector("[id='video-title']");

        if (!titleAnchor)
            throw new Error("Could not find title anchor");

        let videoTitle = titleAnchor.textContent;
        let videoLink = titleAnchor.getAttribute("href");

        if (!videoLink)
            throw new Error("Video link not found");

        let videoId = new URL(videoLink, document.baseURI).searchParams.get("v");

        if (!videoTitle)
            throw new Error("Video title not found");

        if (!videoId)
            throw new Error("Video id not found");

        // GET VIDEO METADAT END --------------------------------------------------------

        // GET UPLOADER METADATA BEGIN ---------------------------------------------------

        let channelNameBadge = metadata.querySelector("[id='channel-name']");

        if (!channelNameBadge)
            throw new Error("Could not find channel name badge");

        let channelAnchor = channelNameBadge.getElementsByTagName("a")[0];
        let channelName = channelAnchor?.textContent;
        
        // If there is no channel name, it's probably a deleted video
        if (!channelName)
        {
            return {
                title: videoTitle,
                videoId: videoId,
                uploader: null,
                uploaderUrl: null,
                element: metadata
            };
        }

        let channelRelLink = channelAnchor.getAttribute("href");
        if (!channelRelLink)
            throw new Error("Channel name not found");
        
        let channelLink = new URL(channelRelLink, document.baseURI).href;

        if (!channelName)
            throw new Error("Channel name not found");

        // GET UPLOADER METADATA END -----------------------------------------------------

        return {
            title: videoTitle,
            videoId: videoId,
            uploader: channelName,
            uploaderUrl: channelLink,
            element: metadata
        };
    } 
}

class MetadataPlaylistController extends Controllers {
    private _totalVideos: number = -1;
    private _playlistVisibility: Visibility = Visibility.Unknown;
    private _playlistVideos: PlaylistItem[] = [];

    public constructor() {
        super();
    }

    public GetTotalVideoInPlaylist(): number 
    {
        let playlistStats = document.getElementById("stats");
        let videoCount = playlistStats?.getElementsByClassName("yt-formatted-string")[0]?.textContent; 
        if (videoCount) {
            return parseInt(videoCount.replace(",", ""));
        }
        else
        {
            return 0;
        }
    }

    public GetPlaylistVisibility(): Visibility
    {
        let privacyForm = document.getElementById("privacy-form");
        let label = privacyForm?.getElementsByTagName("label")[0];
        let privacySettings =  label?.innerHTML.trim();
        console.log(privacySettings);
        switch (privacySettings) {
            case "Public":
                return Visibility.Public;
            case "Unlisted":
                return Visibility.Unlisted;
            case "Private":
                return Visibility.Private;
            default:
                return Visibility.Unknown;
        }
    }

    public GetPlaylistItems(): PlaylistItem[]
    {
        let playlistVideos = Array.from(document.getElementsByTagName("ytd-playlist-video-renderer"));
        let parsedItems: PlaylistItem[] = [];
        playlistVideos.forEach(e => {
            parsedItems.push(Utils.PlaylistItemFromElement(e));
        });
        return parsedItems;
    }

    public Activate()
    {
        this.Update();
        document.addEventListener("yt-service-request-completed", () => {this.Update()});
    }

    public Deactivate()
    {
        document.removeEventListener("yt-service-request-completed", () => {this.Update()});
    }

    public Update()
    {
        console.log("Service Request Completed");
        console.log(this.GetPlaylistItems());
    }

    public GetType(): ControllerType
    {
        return ControllerType.Playlist;
    }
}

class ControllerManager
{
    private _controllers: Map<ControllerType, Controllers> = new Map<ControllerType, Controllers>();

    /**
     * Add a controller to the manager, if the controller already exists, an error will be thrown
     * @param controller instantiated controller object
     * @throws Error if the controller is already added
     */
    public AddController(controller: Controllers)
    {
        if (this._controllers.has(controller.GetType()))
        {
            throw new Error("Controller already exists");
        }

        this._controllers.set(controller.GetType(), controller);
    }

    public GetController(type: ControllerType): Controllers | undefined
    {
        return this._controllers.get(type);
    }

    /**
     * Active the controller of the controllerType 
     * while deactivating all controllers that are not of the same type
     * @param controllerType Controller type to activate
     */
    public SelectActiveController(controllerType: ControllerType)
    {
        this._controllers.forEach(controller => {
            if (controller.GetType() == controllerType) 
            {
                console.log(`Activating Controller: ${ControllerType[controllerType]}`);
                controller.Activate();
            }
            else
            {
                controller.Deactivate();
            }
        });
    }

    /**
     * Deactive one controller, leaving rest of the controllers untouched
     * @param controllerType Controller type to deactivate
     */
    public DeactiveController(controllerType: ControllerType)
    {
        this._controllers.forEach(controller => {
            if (controller.GetType() == controllerType) 
            {
                controller.Deactivate();
            }
        });
    }


    private static _instance: ControllerManager;
    private constructor() {}
    public static GetInstance(): ControllerManager 
    {
        if (!ControllerManager._instance) {
            ControllerManager._instance = new ControllerManager();
        }
        return ControllerManager._instance;
    }
}

class YTMetadataCtrl {
    private _pageState: Page = Page.Other;
    private _controllerManager: ControllerManager;

    private DeterminAction(): void 
    {
        switch (this._pageState) {
            case Page.Video:
                this._controllerManager.SelectActiveController(ControllerType.Video);
                break;
            case Page.Playlist:
                this._controllerManager.SelectActiveController(ControllerType.Playlist);
                break;
            case Page.Other:
                break;
        }
    }

    public UpdatePageState()
    {
        let url = new URL(window.location.href);
        if (url.searchParams.get("list") != null  &&
            url.pathname === "/playlist")
        {
            this._pageState = Page.Playlist;
        }
        else if (url.searchParams.get("v") != null &&
                 url.pathname === "/watch")
        {
            this._pageState = Page.Video;
        }
        else
        {
            this._pageState = Page.Other;
        }
        this.DeterminAction();
    }

    public GetPageState(): Page { return this._pageState; }

    
    private constructor() 
    {
        this._controllerManager = ControllerManager.GetInstance();
        this._controllerManager.AddController(new MetadataPlaylistController());     

        document.addEventListener("yt-navigate-finish", function() {
            YTMetadataCtrl.GetInstance().UpdatePageState();
        });
    }
    private static _instance: YTMetadataCtrl;
    public static GetInstance(): YTMetadataCtrl 
    {
        if (!YTMetadataCtrl._instance) {
            YTMetadataCtrl._instance = new YTMetadataCtrl();
        }
        return YTMetadataCtrl._instance;
    }
}

window.onload = () => {
    var metadataCtrl = YTMetadataCtrl.GetInstance();
    metadataCtrl.UpdatePageState();
}
