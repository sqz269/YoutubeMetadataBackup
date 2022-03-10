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

abstract class Controller
{
    public abstract Activate(): void;
    public abstract Deactivate(): void;
    public abstract IsActive(): boolean;
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
                title: videoTitle.trim(),
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
            title: videoTitle.trim(),
            videoId: videoId,
            uploader: channelName.trim(),
            uploaderUrl: channelLink,
            element: metadata
        };
    }

    public static SetPlaylistItemAttributes(playlistItem: PlaylistItem, title: string, uploader: string, uploaderUrl: string)
    {
        let element = playlistItem.element;
        let titleAnchor = element.querySelector("[id='video-title']");
        
        // textContent prevent XSS?
        titleAnchor!.textContent = title;

        let channelNameBadge = element.querySelector("[id='channel-name']");

        if (!channelNameBadge)
            throw new Error("Could not find channel name badge");

        let channelAnchor = channelNameBadge.getElementsByTagName("a")[0];
        if (channelAnchor)
        {
            channelAnchor.textContent = uploader;
            channelAnchor.setAttribute("href", uploaderUrl);
        }
        // TODO: Manually Create a element then set anchor
    }

    public static GetPageState(): Page
    {
        let url = new URL(window.location.href);
        if (url.searchParams.get("list") != null  &&
            url.pathname === "/playlist")
        {
            return Page.Playlist;
        }
        else if (url.searchParams.get("v") != null &&
                 url.pathname === "/watch")
        {
            return Page.Video;
        }
        else
        {
            return Page.Other;
        }
    }
}

abstract class YTEventHandler extends Controller
{
    private listener: ((event: Event) => void) | null = null;

    constructor() {
        super();
        
        document.addEventListener("yt-navigate-finish", (e) => {
            this.OnNavigationCompleted(e);
        });
    }

    public OnYTServiceRequestCompleted(e: Event): void
    {
        return;
    }

    public OnNavigationCompleted(e: Event): void
    {
        return;
    }

    protected BindYTServiceRequest()
    {
        console.log("Youtube Service Request Binded");
        if (this.listener)
        {
            console.log("Youtube Service Request already binded");
            return;   
        }
        this.listener = this.OnYTServiceRequestCompleted.bind(this);
        document.addEventListener("yt-service-request-completed", this.listener);
    }

    protected UnbindYTServiceRequest()
    {
        console.log("Youtube Service Request Unbinded");
        if (this.listener)
        {
            document.removeEventListener("yt-service-request-completed", this.listener);
            this.listener = null;    
        }
    }

    public IsBinded(): boolean
    {
        return this.listener !== null;
    }
}

class PlaylistMetadataController extends YTEventHandler {
    private _totalVideos: number = -1;
    private _playlistVisibility: Visibility = Visibility.Unknown;
    private _playlistVideos: Map<string, PlaylistItem> = new Map<string, PlaylistItem>();

    public constructor() {
        super();
        this.BindYTServiceRequest();
    }

    public OnYTServiceRequestCompleted(e: Event)
    {
        // @ts-ignore
        if (e?.target?.tagName === "YTD-CONTINUATION-ITEM-RENDERER")
        {
            this.Update();
        }
    }

    public OnNavigationCompleted(e: Event)
    {
        if (Utils.GetPageState() === Page.Playlist)
        {
            if (!this.IsActive())
            {
                this.Activate();
            }
            else
            {
                this.Update();
            }
        }
        else
        {
            this.Deactivate();
        }
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

    private UpdatePlaylistVideos(playlistVideos: PlaylistItem[])
    {
        let deleted = new Map<string, PlaylistItem>();
        playlistVideos.forEach(e => {
            if (!this._playlistVideos.has(e.videoId))
            {
                if (e.uploader === null)
                {
                    deleted.set(e.videoId, e);
            }
                this._playlistVideos.set(e.videoId, e);
            }
        });
        console.log("Deleted videos: " + deleted.size);
        this.ProcessDeletedVideos(deleted);
    }

    private ProcessDeletedVideos(newVideos: Map<string, PlaylistItem>)
    {
        MetadataBackup.RetrieveListOfVideos(Array.from(newVideos.keys()), (error, reason, data) => {
            // HTTP ERROR
            if (error || data == null)
            {
                console.error(reason);
                return;
            }

            // ENDPOINT ERROR
            if (data.error)
            {
                console.error(data.errorMessage);
                return;
            }

            if (data.response.noRecord.length > 0 || data.response.videos.length > 0)
            {
                console.log(`Recorded: ${data.response.videos.length}/No data: ${data.response.noRecord.length}. Rate: ${(data.response.videos.length / (data.response.noRecord.length + data.response.videos.length)* 100).toFixed(0)}%`);
            }

            data.response.videos.forEach(e => {
                // @ts-ignore
                Utils.SetPlaylistItemAttributes(newVideos.get(e.id), e.title, e.uploader, e.uploaderId);
            });

            data.response.noRecord.forEach(e => {
                // @ts-ignore
                Utils.SetPlaylistItemAttributes(newVideos.get(e), "[NO DATA]", "[NO DATA]", "");
            });
        });
    }

    private ResetAll()
    {
        this._totalVideos = -1;
        this._playlistVisibility = Visibility.Unknown;
        this._playlistVideos.clear();
    }

    public Activate()
    {
        this.ResetAll();
        this.Update();
        this.BindYTServiceRequest();
    }

    public Deactivate()
    {
        this.UnbindYTServiceRequest();
    }

    public IsActive(): boolean
    {
        return this.IsBinded();
    }

    public Update()
    {
        this._playlistVisibility = this.GetPlaylistVisibility();
        this._totalVideos = this.GetTotalVideoInPlaylist();
        this.UpdatePlaylistVideos(this.GetPlaylistItems());
    }

    public GetType(): ControllerType
    {
        return ControllerType.Playlist;
    }
}

class VideoMetadataController extends YTEventHandler {
    private isActivated = false;
    
    public constructor() 
    {
        super();
        this.BindYTServiceRequest();
    }

    public OnYTServiceRequestCompleted(e: Event) {}

    public OnNavigationCompleted(e: Event)
    {
        if (Utils.GetPageState() === Page.Video)
        {
            if (!this.IsActive())
            {
                this.Activate();
                this.Update();
            }
            else
            {
                this.Update();
            }
        }
    }

    public Activate()
    {
        this.isActivated = true;
    }

    public Deactivate()
    {
        this.isActivated = false;
    }

    public IsActive(): boolean
    {
        return this.isActivated;
    }

    public Update()
    {
        let videoId = new URL(document.location.toString()).searchParams.get("v");
        console.log(videoId);
        if (videoId)
        {
            MetadataBackup.BackupVideoQueue(videoId, (error, reason, data) => {
                console.log(data);
            })
        }
    }

    public GetType(): ControllerType
    {
        return ControllerType.Video;
    }
}

class ControllerManager
{
    private _controllers: Map<ControllerType, Controller> = new Map<ControllerType, Controller>();

    /**
     * Add a controller to the manager, if the controller already exists, an error will be thrown
     * @param controller instantiated controller object
     * @throws Error if the controller is already added
     */
    public AddController(controller: Controller)
    {
        if (this._controllers.has(controller.GetType()))
        {
            throw new Error("Controller already exists");
        }

        this._controllers.set(controller.GetType(), controller);
    }

    public GetController(type: ControllerType): Controller | undefined
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
                this.DeactivateIfNotActive(controller);
            }
        });
    }

    public DeactivateAll()
    {
        this._controllers.forEach(controller => {
            this.DeactivateIfNotActive(controller);
        });
    }

    protected DeactivateIfNotActive(controller: Controller)
    {
        if (controller.IsActive())
        {
            controller.Deactivate();
        }
    }

    /**
     * Deactive one controller, leaving rest of the controllers untouched
     * @param controllerType Controller type to deactivate
     */
    public DeactivateController(controllerType: ControllerType)
    {
        this._controllers.forEach(controller => {
            if (controller.GetType() == controllerType) 
            {
                this.DeactivateIfNotActive(controller);
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

window.onload = () => {
    let mgr = ControllerManager.GetInstance();
    mgr.AddController(new PlaylistMetadataController());
    mgr.AddController(new VideoMetadataController());
}
