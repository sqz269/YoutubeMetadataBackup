<template>
    <div>
        <main id="view-search" class="px-3 mb-a-lot">
            <h3>Search Youtube Video</h3>
            <hr class="my-4">
            <p class="lead">Enter Playlist/Video's URL or ID</p>
            <div class="input-group input-group-lg sharp-corners mb-3">
                <input v-model="targetData" id="search-input" type="text" class="form-control text-input" placeholder="ID or URL">
                <div class="input-group-append">
                    <button @click="searchVideo" class="btn btn-lg btn-outline-secondary" type="button">Search</button>
                </div>
            </div>
            <div id="backup-status" class="d-flex align-items-center mt-4" :class="{'d-none': !showStatus}">
                <p class="lead status-message" :class="{'text-danger': this.statusIsError}">
                    {{ statusMessage }}
                    <a class="text-link-simple" @click="showModal" :class="{'d-none': !this.showDetailsBtn}">View</a>
                </p>
                <div class="ms-auto">
                    <div class="spinner-border ms-auto" role="status" aria-hidden="true" :class="{'d-none': !processing}"></div>
                </div>
            </div>
        </main>
        <SearchResultModal v-bind:show-modal="this.showDetailsModal" v-bind:api-response="this.lastApiResp" @close="closeModal"></SearchResultModal>
    </div>
</template>

<script>
import SearchResultModal from "@/components/SearchResultModal";
import {Utils} from "@/assets/ts/Utils";
import {YoutubeDataAPIHandler} from "@/assets/ts/YoutubeDataAPIHandler";
import {MetadataBackup} from "@/assets/ts/MetadataBackup";

export default {
    name: "Search",
    components: {
        SearchResultModal
    },
    data: function () {
        return {
            targetData: "",

            showStatus: false,
            processing: false,
            statusMessage: "",
            statusIsError: false,
            showDetailsBtn: false,
            showDetailsModal: false,
            lastApiResp: false
        }
    },
    methods: {
        _searchVideo: function (videoIds) {
            let searchVideo = {endpoint: `${window.apiEndpointDomain}/api/youtube/videos/get`, method: "POST"};

            this.statusMessage = "Please wait warmly while the server is processing our request";
            this.processing = true;

            let that = this;
            MetadataBackup.RetrieveListOfVideos(searchVideo.endpoint, videoIds, function (response) {
                if (response.error)
                {
                    that.statusMessage = response.errorMessage;
                    that.statusIsError = true;
                    that.processing = false;
                }
                else
                {
                    that.lastApiResp = response;
                    that.statusMessage = `Retrieved ${response.response.videos.length} Items.`;
                    that.processing = false;
                    that.showDetailsBtn = true;
                    that.showDetailsModal = true;
                }
            })
        },
        searchVideo: function () {

            this.showStatus = true;
            this.processing = true;
            this.statusIsError = false;
            this.statusMessage = "Please Wait ...";
            this.showDetailsBtn = false;

            let data = Utils.DetermineIdType(this.targetData);
            if (data.type === null)
            {
                this.statusMessage = "ERROR: Please Enter a Playlist/Video URL or ID";
                this.statusIsError = true;
                this.processing = false;
                return;
            }

            if (data.type === Utils.IDType.Playlist)
            {
                const that = this;
                YoutubeDataAPIHandler.FetchPlaylistItems(data.id, function (error, reason, items) {
                    if (error)
                    {
                        that.statusMessage = `ERROR Fetching Playlist: ${reason}`;
                        that.statusIsError = true;
                        that.processing = false;
                        return;
                    }

                    let videosDeleted = [];
                    items.forEach(function (e) {
                        if (e.snippet.description === "This video is unavailable.")
                        {
                            videosDeleted.push(e.snippet.resourceId.videoId);
                        }
                    });
                    that._searchVideo(videosDeleted);
                }, function (fetched, total) {
                    that.statusMessage = `Fetching Playlist Items. (${fetched}/${total})`;
                });
            }
            else
            {
                let videoIds = data.id.replace(/(^,)|(,$)|( )/g, "").replace(" ", "").split(",")
                this._searchVideo(videoIds);
            }
        },
        showModal: function () {
            this.showDetailsModal = true;
        },
        closeModal: function () {
            this.showDetailsModal = false;
        }
    }
}
</script>
