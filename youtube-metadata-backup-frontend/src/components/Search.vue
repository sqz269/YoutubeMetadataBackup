<template>
  <div>

    <main id="view-search" class="px-3 mb-a-lot">
      <h3>Search Youtube Video</h3>
      <hr class="my-4">
      <p class="lead">Enter Playlist/Video's URL or ID</p>
      <div class="input-group input-group-lg sharp-corners mb-1">
        <input v-model="inputData" id="search-input" type="text" class="form-control text-input" placeholder="ID or URL">
        <div class="input-group-append">
          <button @click="this.search" class="btn btn-lg btn-outline-secondary" type="button">Search</button>
        </div>
      </div>
<!--      <div class="row">-->
<!--        <div class="col-12">-->
<!--          <a class="text-link-simple float-md-end" @click="showAdvancedSearchModal">-->
<!--            Advanced Search-->
<!--          </a>-->
<!--        </div>-->
<!--      </div>-->
      <StatusMessage ref="status"></StatusMessage>
    </main>
    <SearchResultModal ref="searchResult"></SearchResultModal>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import StatusMessage from "@/components/StatusMessage.vue";
import SearchResultModal from "@/components/SearchResultModal.vue";
import {MetadataBackup} from "@/assets/ts/MetadataBackup";
import {IdType, Utils} from "@/assets/ts/Utils";
import {YoutubeDataAPIHandler} from "@/assets/ts/YoutubeDataAPIHandler";
@Component({
  components: {SearchResultModal, StatusMessage}
})
export default class Search extends Vue {
  $refs!: {
    searchResult: SearchResultModal
    status: StatusMessage
  }

  private inputData = "";

  search(): void {
    const idType = Utils.DetermineIdType(this.inputData);
    console.log(idType);
    switch (idType.type) {
      case IdType.Video:
        // the brackets for idType.id is to convert one single id to a string array
        // because searchVideo only accepts an array of playlist IDs
        // @ts-ignore
        this.searchVideo([idType.id]);
        break;
      case IdType.VideoList:
        // @ts-ignore
        this.searchVideo(idType.id);
        break;
      case IdType.Playlist:
        // @ts-ignore
        this.searchPlaylist(idType.id);
        break;

      case IdType.Channel:
      case IdType.Username:
      case IdType.CustomUrl:
        this.$refs.status.Error("Search by Channel is currently not supported. Please provide a Video/Playlist ID");
        break;

      case IdType.Empty:
      case IdType.Unknown:
        this.$refs.status.Error("Invalid Input. Please Enter a Video or Playlist ID")
        break;
    }
  }

  searchVideo(videoIds: string[]): void {
    this.$refs.status.Loading("Please wait warmly while the server is processing our request")

    MetadataBackup.RetrieveListOfVideos(videoIds, (response => {
      if (response.error)
      {
        this.$refs.status.Error(`Error while retrieving data: ${response.errorMessage}`)
        return;
      }

      this.$refs.status.Details("Data Retrieved.", () => {
        this.$refs.searchResult.showModal();
      })
      this.$refs.searchResult.Response = response;
      this.$refs.searchResult.showModal();
    }))
  }

  searchPlaylist(playlistId: string): void {
    this.$refs.status.Loading(`Retrieving Playlist Data`);

    YoutubeDataAPIHandler.FetchPlaylistItems(playlistId,
    ((error, errorReason, items) => {
      if (error)
      {
        this.$refs.status.Error(`Error while Fetching Playlist: ${errorReason}`);
        return;
      }

      const videoIds: string[] = [];
      items.forEach(e => {
        // Only try to retrieve deleted videos
        if (e.snippet?.description === "This video is unavailable.")
        {
          let videoId = e.snippet?.resourceId?.videoId;
          if (videoId)
            videoIds.push(videoId);
        }
      });

      this.searchVideo(videoIds);
    }),
    ((fetched, total) => {
      this.$refs.status.Loading(`Fetching Playlist Items: ${fetched}/${total}`);
    }))
  }
}
</script>
