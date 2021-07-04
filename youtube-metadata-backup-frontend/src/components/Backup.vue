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
      <StatusMessage ref="status"></StatusMessage>
    </main>
    <ChannelSelectModal ref="channelSelect"></ChannelSelectModal>
    <BackupResultModel ref="backupResult"></BackupResultModel>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import StatusMessage from "@/components/StatusMessage.vue";
import {Utils, IdType} from "@/assets/ts/Utils";
import {YoutubeDataAPIHandler} from "@/assets/ts/YoutubeDataAPIHandler";
import {MetadataBackup} from "@/assets/ts/MetadataBackup";
import ChannelSelectModal from "@/components/ChannelSelectModal.vue";
import BackupResultModel from "@/components/BackupResultModel.vue";

@Component({
  components: {BackupResultModel, ChannelSelectModal, StatusMessage}
})
export default class Backup extends Vue {
  inputId = "";

  $refs!: {
    status: StatusMessage,
    channelSelect: ChannelSelectModal,
    backupResult: BackupResultModel
  }

  backup(): void {
    const idType = Utils.DetermineIdType(this.inputId);
    switch (idType.type) {
      case IdType.Playlist:
        // @ts-ignore
        this.backupPlaylist(idType.id);
        break;
      case IdType.Channel:
        // @ts-ignore
        this.backupChannelForId(idType.id);
        break;
      case IdType.Username:
        // @ts-ignore
        this.backupChannelForUsername(idType.id);
        break;
      case IdType.Video:
        // @ts-ignore
        this.backupChannelFromVideo(idType.id);
        break;
      case IdType.VideoList:
        this.$refs.status.Error("Video List is currently not supported by Backup. Please Enter a Channel or Playlist ID");
        break;
      case IdType.CustomUrl:
        this.$refs.status.Error("Channel Custom URL is currently not supported. Please provide a video ID from the channel.");
        break;
      case IdType.Empty:
      case IdType.Unknown:
        this.$refs.status.Error("Invalid Input. Please Enter a Channel or Playlist ID");
        break;
    }
  }

  backupVideoArray(videos: string[]): void {
    this.$refs.status.Loading("Please wait warmly while the server is processing our request")

    MetadataBackup.BackupVideos(videos, (response => {
      if (response.error) {
        this.$refs.status.Error(`Error backing up videos: ${response.errorMessage}`);
        return;
      }

      this.$refs.status.Details("Backup Complete", () => {
        this.$refs.backupResult.showModal();
      });

      this.$refs.backupResult.SetBackupResult(response);
    }));
  }

  backupPlaylist(playlistId: string): void {
    YoutubeDataAPIHandler.FetchPlaylistItems(playlistId,
      ((error, errorReason, items) => {
        if (error)
        {
          this.$refs.status.Error(`Error while Fetching Playlist: ${errorReason}`);
          return;
        }

        const videoIds: string[] = [];
        items.forEach(e => {
          const videoId = e.snippet?.resourceId?.videoId;
          if (videoId)
            videoIds.push(videoId);
        });

        this.backupVideoArray(videoIds);
      }),
      ((fetched, total) => {
        this.$refs.status.Loading(`Fetching Playlist Items: ${fetched}/${total}`);
      })
    )
  }

  backupChannelForId(channelId: string): void {
    this.$refs.status.Loading("Getting Channel's Uploaded List");

    YoutubeDataAPIHandler.GetChannelUploadPlaylist(channelId, ((error, errorReason, data) => {
      if (error)
      {
        this.$refs.status.Error(`Error getting channel's upload playlist: ${errorReason}`);
        return;
      }

      if (!data)
      {
        this.$refs.status.Error(`No Upload playlist returned for Channel`);
        return;
      }

      this.backupPlaylist(data);
    }));
  }

  backupChannelForUsername(channelUsername: string): void {
    this.$refs.status.Loading("Getting list of channels from Username");

    YoutubeDataAPIHandler.GetChannelDetailsFromUsername(channelUsername, ((error, errorReason, data) => {
      if (error)
      {
        this.$refs.status.Error(`Error fetching channels from Username: ${errorReason}`);
        return;
      }

      if (!data)
      {
        this.$refs.status.Error(`No channel with name: ${channelUsername} found`);
        return;
      }

      // If there is only one channel with given username, auto select it for user
      if (data.length === 1)
      {
        console.log(`Only one channel with username: ${channelUsername}. Auto selecting it`);
        const uploadsPlaylist = data[0]?.contentDetails?.relatedPlaylists?.uploads;
        if (!uploadsPlaylist)
        {
          this.$refs.status.Error(`Error: Unable to find Uploads Playlist for Channel: ${data[0].id}`);
          return;
        }

        this.backupPlaylist(uploadsPlaylist);
      }
      // Multiple channels with the same name
      else
      {
        // this.$refs.channelSelect.setChannelsToSelect(data);
      }
    }));
  }

  backupChannelFromVideo(videoId: string): void {
    this.$refs.status.Loading("Retrieving Channel ID from Video");
    YoutubeDataAPIHandler.GetChannelIdFromVideo(videoId, ((error, errorReason, data) => {
      if (error)
      {
        this.$refs.status.Error(`Failed to retrieve video details: ${errorReason}`);
        return;
      }

      if (!data)
      {
        this.$refs.status.Error(`No details retrieved for Video ID: ${videoId}. Is the Video ID Correct?`);
        return;
      }

      this.backupChannelForId(data);
    }))
  }
}
</script>
