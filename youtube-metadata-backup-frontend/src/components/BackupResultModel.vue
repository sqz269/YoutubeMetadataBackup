<template>
  <b-modal
    size="lg"
    v-model="show"
    title="Backup Result"
    hide-footer
    header-bg-variant="dark"
    body-bg-variant="dark"
    footer-bg-variant="dark"
    header-close-content=""
  >

    <b-row v-if="this.response">
      <b-col cols="12">
        <p class="lead">Total Items Processed: {{ this.response.response.totalItemProcessed }}</p>
      </b-col>

      <b-col sm="6" class="scrollable-table" style="max-height: 400px">
        <VideoIdTable :table-title="`Added (${ this.response.response.totalNewItemsAdded })`"
                      :video-ids="this.response.response.addedVideoIds">
        </VideoIdTable>
      </b-col>

      <b-col sm="6" class="scrollable-table" style="max-height: 400px">
        <VideoIdTable :table-title="`Failed (${ this.response.response.totalItemsFailedToAdd })`"
                      :video-ids="this.response.response.failedVideoIds">
        </VideoIdTable>
      </b-col>
    </b-row>

  </b-modal>
</template>

<script lang="ts">
import {Vue} from "vue-property-decorator";
import Component from "vue-class-component";
import {MetadataBackup} from "@/assets/ts/MetadataBackup";
import VideoIdTable from "@/components/VideoIdTable.vue";

import ExecutionResult = MetadataBackup.Response.ExecutionResult;
import VideoAddResult = MetadataBackup.Response.VideoAddResult;

@Component({
  components: {VideoIdTable}
})
export default class BackupResultModel extends Vue {
  private show = false;
  private response: ExecutionResult<VideoAddResult> | null = null;

  public showModal(): void { this.show = true; }
  public hideModal(): void { this.show = false; }
  public toggleModal(): void { this.show = !this.show; }

  public SetBackupResult(result: ExecutionResult<VideoAddResult>): void
  {
    this.response = result;
    this.showModal();
  }
}
</script>
