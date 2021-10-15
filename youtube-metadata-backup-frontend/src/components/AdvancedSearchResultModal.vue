<template>
  <b-modal
    v-model="show"
    modal-class="modal-fullscreen"
    title="Search Result"
    hide-footer
    header-bg-variant="dark"
    body-bg-variant="dark"
    footer-bg-variant="dark"
    header-close-content=""
  >

    <div class="pt-2 border-top border-white">
      <StatusMessage ref="status"></StatusMessage>
    </div>

    <b-row v-if="this.response">
      <div class="col-12 pb-3">
        <button class="btn btn-outline-secondary w-100" @click="this.exportResults">Export Results</button>
      </div>

      <div class="col-12 mb-2 col-12 pt-2 border-top border-white">
        <div class="table-responsive w-100 scrollable-table" style="max-height: 80vh">
          <table class="table table-dark">
            <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Uploader</th>
              <th>Uploaded Date</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="video in this.response" v-bind:key="video.id">
              <th>{{ video.id }}</th>
              <td>{{ video.title }}</td>
              <td>
                <a v-bind:href="'https://www.youtube.com/channel/' + video.uploaderId" target="_blank" class="text-link-simple">
                  {{video.uploader}}
                </a>
              </td>
              <td>{{ UnixTimestampToDateString(video.published) }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </b-row>

  </b-modal>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {MetadataBackup} from "@/assets/ts/MetadataBackup";
import StatusMessage from "@/components/StatusMessage.vue";
import SearchQuery = MetadataBackup.Request.SearchQuery;
import VideoMetadata = MetadataBackup.Response.VideoMetadata;
import {Utils} from "@/assets/ts/Utils";

@Component({
  components: {StatusMessage}
})
export default class AdvancedSearchResultModal extends Vue {
  $refs: {
    status: StatusMessage
  }

  private show = true;
  public showModal(query: SearchQuery, result: VideoMetadata[]): void
  {
    this.query = query;
    this.response = result;
    this.show = true;
  }
  public hideModal(): void { this.show = false; }
  public toggleModal(): void { this.show = !this.show; }

  private query: SearchQuery;
  private response: VideoMetadata[] = [];

  exportResults(): void {
    MetadataBackup.CountQueryResult(this.query, ((response, exportUrl) => {
      if (response.response.limitExceeded)
      {
        this.$refs.status.Error(`Unable to export all search results. ` +
          `Document limit exceeded (${response.response.documents}/${response.response.responseLimit})` +
          `Please narrow your search query to limit the amount of results.`);
        alert(`Unable to export all search results. ` +
        `Document limit exceeded (${response.response.documents}/${response.response.responseLimit})` +
        `Please narrow your search query to limit the amount of results.`);
        return;
      }

      Utils.DownloadUrl(exportUrl, "search_export.json");
    }))
  }

  UnixTimestampToDateString = Utils.UnixTimestampToDateString;
}
</script>
