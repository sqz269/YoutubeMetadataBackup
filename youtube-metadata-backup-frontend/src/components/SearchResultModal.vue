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

    <b-row v-if="this.response">
      <div class="col-md-6">
        <button class="btn btn-outline-secondary w-100" @click="this.exportAsCsv">Export as CSV</button>
      </div>
      <!-- Only top margin if the button is stacked -->
      <div class="col-md-6 mt-2 mt-md-0 mb-3">
        <button class="btn btn-outline-secondary w-100" @click="this.exportAsJson">Export as JSON</button>
      </div>

      <div class="col-12 pt-2 border-top border-white">
        <p class="lead mb-1">Recorded: {{ this.response.videos.length }}</p>
      </div>
      <div class="col-12 mb-2">
        <div class="table-responsive w-100 scrollable-table" style="max-height: 40vh">
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
            <tr v-for="video in this.response.videos" v-bind:key="video.id">
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
      <div class="col-12 pt-2 border-top border-white" v-if="this.response.noRecord">
        <p class="lead mb-1">Unrecorded: {{ this.response.noRecord.length }}</p>
      </div>
      <div class="col-12" v-if="this.response.noRecord">
        <div class="table-responsive w-100 scrollable-table" style="max-height: 30vh">
          <table class="table table-dark">
            <thead>
            <tr>
              <th>ID</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="id in this.response.noRecord" v-bind:key="id">
              <th>{{ id }}</th>
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

import ExecutionResult = MetadataBackup.Response.ExecutionResult;
import VideoListResult = MetadataBackup.Response.VideoListResult;
import {Utils} from "@/assets/ts/Utils";
import VideoMetadata = MetadataBackup.Response.VideoMetadata;

@Component
export default class SearchResultModal extends Vue {
  private show = false;
  public showModal(): void { this.show = true; }
  public hideModal(): void { this.show = false; }
  public toggleModal(): void { this.show = !this.show; }

  private response: VideoListResult | null = null;
  set Response(value: ExecutionResult<VideoListResult>) {
    this.response = value.response;
  }

  UnixTimestampToDateString = Utils.UnixTimestampToDateString

  exportAsCsv(): void {
    this.exportCsvNoRecord();
    this.exportCsvRetrieved();
  }
  exportCsvRetrieved(): void {
    const rows = [];
    // write csv headers
    // @ts-ignore
    if (!this.response?.videos[0])
      return;
    rows.push(Object.keys(this.response?.videos[0]).join(","));

    this.response?.videos.forEach((e: VideoMetadata) => {
      const l = [];
      // @ts-ignore
      for (const key of Object.keys(e)) {
        // @ts-ignore
        const val = e[key];
        // For some reason, we can't directly access val.replace because val.replace is not a function,
        // so we gotta convert it to string first, then replace, then push to the list
        // Also, about escaping quotes in csv:
        // https://stackoverflow.com/questions/17808511/properly-escape-a-double-quote-in-csv
        // Also, We didn't escape "\" , etc, because i am too lazy
        const tmp = `${val}`.replace(/"/g, `""`).replace(/'/g, `''`);
        l.push(`"${tmp}"`);
      }
      rows.push(l.join(",").replace(/(\r\n|\r|\n)/g, "\\n"));
    });

    let csv = rows.join("\n");
    Utils.ExportData([csv], "export_data.csv", {type: "text/csv"});
  }
  exportCsvNoRecord(): void {
    const rows = ["videoId"];
    if (!this.response?.noRecord)
      return;

    rows.push(...this.response?.noRecord);
    let csvData = rows.join("\r\n");
    Utils.ExportData([csvData], "export_no_record.csv", {type: "text/csv"});
  }

  exportAsJson(): void {
    Utils.ExportData([JSON.stringify(this.response)], "export.json", {type: "application/json"});
  }
}
</script>
