<template>
    <div>
        <main id="view-backup" class="px-3 mb-a-lot">
            <h3>Backup Playlist</h3>
            <hr class="my-4">
            <p class="lead">Enter Playlist's URL or ID</p>
            <div class="input-group input-group-lg sharp-corners mb-3">
                <input v-model="playlistUrl" id="backup-input" type="text" class="form-control text-input" placeholder="Playlist ID or URL">
                <div class="input-group-append">
                    <button @click="backupPlaylist" class="btn btn-lg btn-outline-secondary" type="button">Backup</button>
                </div>
            </div>
            <div id="backup-status" class="d-flex align-items-center mt-4" :class="{'d-none': !showStatus}">
                <p class="lead status-message" :class="{'text-danger': this.statusIsError}">
                    {{ statusMessage }}
                    <a class="text-link-simple" @click="showModal" :class="{'d-none': !this.showDetailsBtn}">Details</a>
                </p>
                <div class="spinner-border ms-auto" role="status" aria-hidden="true" :class="{'d-none': !processing}"></div>
            </div>
        </main>
        <BackupResultModal v-bind:show-modal="this.showDetailsModal" v-bind:api-response="this.lastApiResp" @close="closeModal"></BackupResultModal>
    </div>
</template>

<script>
import {Utils} from "@/assets/ts/Utils";
import {YoutubeDataAPIHandler} from "@/assets/ts/YoutubeDataAPIHandler";
import {MetadataBackup} from "@/assets/ts/MetadataBackup";
import BackupResultModal from "@/components/BackupResultModal";

export default {
    name: "Backup",
    components: {
        BackupResultModal
    },
    data: function() {
        return {
            playlistUrl: "",

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
        closeModal() {
            this.showDetailsModal = false;
        },
        showModal() {
            this.showDetailsModal = true;
        },
        backupPlaylist: function () {
            let backupVideosEndpoint = {endpoint: `${window.apiEndpointDomain}/api/youtube/videos/add`, method: "POST"};

            this.showStatus = true;
            this.processing = true;
            this.statusIsError = false;
            this.statusMessage = "Please Wait ...";
            this.showDetailsBtn = false;

            let playlistId = Utils.GetQueryParams(this.playlistUrl, "list") || this.playlistUrl;
            if (!playlistId)
            {
                this.statusMessage = "ERROR: Please Enter a playlist URL or ID";
                this.statusIsError = true;
                this.processing = false;
                return;
            }

            const that = this;
            YoutubeDataAPIHandler.FetchPlaylistItems(playlistId, function (items) {
                let videoIds = [];
                items.forEach(e => {
                    videoIds.push(e.snippet.resourceId.videoId);
                })

                that.statusMessage = "Please wait warmly while the server is processing our request";
                that.processing = true;
                MetadataBackup.BackupVideos(backupVideosEndpoint.endpoint, videoIds, function (response) {
                    if (response.error)
                    {
                        that.statusMessage = response.errorMessage;
                        that.statusIsError = true;
                        that.processing = false;
                    }
                    else
                    {
                        that.lastApiResp = response;
                        that.statusMessage = `Completed.`;
                        that.processing = false;
                        that.showDetailsBtn = true;
                        that.showDetailsModal = true;
                    }
                })
            }, function (fetched, total) {
                that.statusMessage = `Fetching Playlist Items. (${fetched}/${total})`;
            });
        }
    }
}
</script>
