<template>
    <div>
        <main id="view-backup" class="px-3 mb-a-lot">
            <h3>Backup Playlist</h3>
            <hr class="my-4">
            <p class="lead">Enter Playlist/Channel ID</p>
            <div class="input-group input-group-lg sharp-corners mb-3">
                <input v-model="inputId" id="backup-input" type="text" class="form-control text-input" placeholder="Playlist/Channel ID">
                <div class="input-group-append">
                    <button @click="backup" class="btn btn-lg btn-outline-secondary" type="button">Backup</button>
                </div>
            </div>
            <div id="backup-status" class="d-flex align-items-center mt-4" :class="{'d-none': !showStatus}">
                <p class="lead status-message" :class="{'text-danger': this.statusIsError}">
                    {{ statusMessage }}
                    <a class="text-link-simple" @click="showModal" :class="{'d-none': !this.showDetailsBtn}">Details</a>
                </p>
                <div class="ms-auto">
                    <div class="spinner-border ms-auto" role="status" aria-hidden="true" :class="{'d-none': !processing}"></div>
                </div>
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
            inputId: "",

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
        closeModal: function() {
            this.showDetailsModal = false;
        },
        showModal: function() {
            this.showDetailsModal = true;
        },
        setErrorStatus: function (errorMessage)
        {
            this.statusMessage = errorMessage;
            this.statusIsError = true;
            this.showStatus = true;
            this.processing = false;
            this.showDetailsBtn = false;
        },
        setCompleteMessage: function (message, showDetails=true)
        {
            this.statusMessage = message;
            this.statusIsError = false;
            this.showStatus = true;
            this.processing = false;
            this.showDetailsBtn = showDetails;
        },
        setProcessingStatus: function (message)
        {
            this.statusMessage = message;
            this.statusIsError = false;
            this.showStatus = true;
            this.processing = true;
            this.showDetailsBtn = false;
        },
        backup: function ()
        {
            let idType = Utils.DetermineIdType(this.inputId);

            switch (idType.type)
            {
                case Utils.IDType.Playlist:
                    this.backupPlaylist(idType.id);
                    break;
                case Utils.IDType.Channel:
                    this.backupChannel(idType.id);
                    break;
                case Utils.IDType.Video:
                    this.setErrorStatus("ERROR: Per Video Backup is not supported, Please Enter a Playlist/Channel ID")
                    break;
                case Utils.IDType.Empty:
                    this.setErrorStatus("ERROR: Please Enter a Playlist/Channel ID")
                    break;
                case Utils.IDType.Unknown:
                    this.setErrorStatus("ERROR: Unrecognized ID. Did you enter a channel name rather than channel ID? (Channel ID should start with 'UC')")
                    break;
            }
        },
        backupPlaylist: function (playlistId) {
            let backupVideosEndpoint = {endpoint: `${window.apiEndpointDomain}/api/youtube/videos/add`, method: "POST"};

            this.setProcessingStatus("Please Wait ...")

            if (!playlistId)
            {
                this.setErrorStatus("ERROR: Please Enter a playlist URL or ID")
                return;
            }

            const that = this;
            YoutubeDataAPIHandler.FetchPlaylistItems(playlistId, function (error, reason, items) {
                if (error)
                {
                    that.setErrorStatus(`ERROR Fetching Playlist: ${reason}`);
                    return;
                }

                let videoIds = [];
                items.forEach(e => {
                    videoIds.push(e.snippet.resourceId.videoId);
                })

                that.setProcessingStatus("Please wait warmly while the server is processing our request");

                MetadataBackup.BackupVideos(backupVideosEndpoint.endpoint, videoIds, function (response) {
                    if (response.error)
                    {
                        that.setErrorStatus(`ERROR: ${response.errorMessage}`);
                    }
                    else
                    {
                        that.lastApiResp = response;
                        that.setCompleteMessage("Completed", true);
                        that.showModal();
                    }
                })
            }, function (fetched, total) {
                that.setProcessingStatus(`Fetching Playlist Items. (${fetched}/${total})`);
            });
        },
        backupChannel: function (channelId)
        {
            let that = this;
            YoutubeDataAPIHandler.GetChannelUploadPlaylist(channelId, function (error, reason, data) {
                if (error)
                {
                    that.setErrorStatus(`ERROR Getting Channel: ${reason}`)
                    return;
                }

                that.backupPlaylist(data);
            });
        }
    }
}
</script>
