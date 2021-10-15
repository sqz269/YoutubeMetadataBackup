<template>
  <div>
    <b-modal
      size="lg"
      v-model="show"
      title="Advanced Search"
      hide-footer
      header-bg-variant="dark"
      body-bg-variant="dark"
      footer-bg-variant="dark"
      header-close-content=""
    >

      <div class="container-fluid">
        <div class="form-group mb-3">
          <div class="row">
            <div class="col-lg-2 my-auto">
              <label for="search-title" class="lead float-start">
                Title
              </label>
            </div>
            <div class="col-lg-10">
              <input v-model="title" type="text" class="form-control" id="search-title" placeholder="Video Title">
            </div>
          </div>
        </div>

        <div class="form-group mb-3">
          <div class="row">
            <div class="col-lg-2 my-auto">
              <label for="search-description" class="lead float-start">
                Description
              </label>
            </div>
            <div class="col-lg-10">
              <input v-model="description" type="text" class="form-control" id="search-description" placeholder="Video Description">
            </div>
          </div>
        </div>

        <div class="form-group mb-3">
          <div class="row">
            <div class="col-lg-2 my-auto">
              <label for="search-uploader" class="lead float-start">
                Uploader
              </label>
            </div>
            <div class="col-lg-10">
              <input v-model="uploader" :disabled="uploaderId.length > 0" type="text" class="form-control" id="search-uploader" placeholder="Uploader Username">
            </div>
          </div>
        </div>

        <div class="form-group mb-3">
          <div class="row">
            <div class="col-lg-2 my-auto">
              <label for="search-uploader-id" class="lead float-start">
                Uploader ID
              </label>
            </div>
            <div class="col-lg-10">
              <input v-model="uploaderId" :disabled="uploader.length > 0" type="text" class="form-control" id="search-uploader-id" placeholder="Uploader Channel ID">
            </div>
          </div>
        </div>

        <div class="form-group mb-3">
          <div class="row">
            <div class="col-lg-2 my-auto">
              <label for="search-start-time" class="lead float-start">
                Time Begin
              </label>
            </div>
            <div class="col-lg-10">
              <input v-model="timeStart" type="text" class="form-control" id="search-start-time" placeholder="[yyyy-mm-dd] Published Time (Greater Than)">
            </div>
          </div>
        </div>

        <div class="form-group mb-3">
          <div class="row">
            <div class="col-lg-2 my-auto">
              <label for="search-end-time" class="lead float-start">
                Time End
              </label>
            </div>
            <div class="col-lg-10">
              <input v-model="timeEnd" type="text" class="form-control" id="search-end-time" placeholder="[yyyy-mm-dd] Published Time (Lesser Than)">
            </div>
          </div>
        </div>

        <div class="form-group mb-3">
          <div class="row">
            <div class="col-lg-2 my-auto">
              <label for="search-use-regex" class="lead float-start">
                Use Regex
              </label>
            </div>
            <div class="col-lg-10">
              <div class="d-flex h-100">
                <input v-model="useRegex" class="form-check-input my-auto" type="checkbox" id="search-use-regex" checked>
              </div>
            </div>
          </div>
        </div>

        <StatusMessage ref="status"></StatusMessage>

        <hr class="my-4">

        <div class="mt-3">
          <button @click="advancedSearch" class="btn btn-lg btn-outline-secondary w-100">Search</button>
        </div>
      </div>
    </b-modal>
    <AdvancedSearchResultModal ref="searchResult"></AdvancedSearchResultModal>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {IdType, Utils} from "@/assets/ts/Utils";
import {MetadataBackup} from "@/assets/ts/MetadataBackup";
import SearchQuery = MetadataBackup.Request.SearchQuery;
import StatusMessage from "@/components/StatusMessage.vue";
import AdvancedSearchResultModal from "@/components/AdvancedSearchResultModal.vue";

@Component({
  components: {AdvancedSearchResultModal, StatusMessage}
})
export default class AdvancedSearchModal extends Vue {
  $refs: {
    status: StatusMessage,
    searchResult: AdvancedSearchResultModal
  }

  private show = false;
  public showModal(): void { this.show = true; }
  public hideModal(): void { this.show = false; }
  public toggleModal(): void { this.show = !this.show; }

  private title = ""
  private description = ""
  private uploader = ""
  private uploaderId = ""
  private timeStart = ""
  private timeEnd = ""
  private useRegex = false

  private lastQuery: SearchQuery;

  isValidRegex(regex: string): boolean
  {
    try {
      new RegExp(regex);
      return true;
    } catch (e) {
      return false;
    }
  }

  isValidTime(time: string): boolean
  {
    return isFinite(new Date(time).getTime());
  }

  invalidateInput(reason: string): void
  {
    this.$refs.status.Error(reason);
  }

  validateInput(): boolean {
    this.$refs.status.ResetStatus();
    if (this.useRegex)
    {
      let regexFields = {
        "Title": this.title,
        "Description": this.description,
        "Uploader": this.uploader
      }
      for (let key in regexFields) {
        if (Object.prototype.hasOwnProperty.call(regexFields, key)) {
          // @ts-ignore
          if (!this.isValidRegex(regexFields[key]))
          {
            this.invalidateInput(`Invalid Input, Value for "${key}" is not a valid regular expression`);
            return false;
          }
        }
      }
    }
    let timeFields = {
      "Time Begin": this.timeStart,
      "Time End": this.timeEnd,
    }
    for (let key in timeFields) {
      if (Object.prototype.hasOwnProperty.call(timeFields, key)) {
        // @ts-ignore
        if (timeFields[key] && !this.isValidTime(timeFields[key]))
        {
          this.invalidateInput(`Invalid Input, Value for "${key}" is not a valid date`);
          return false;
        }
      }
    }
    if (this.uploaderId)
    {
      let idType = Utils.DetermineIdType(this.uploaderId);
      if (idType.type !== IdType.Channel)
      {
        {
          this.invalidateInput(`Invalid Input, Value for "Uploader ID" is not a valid Channel ID`);
          return false;
        }
      }
    }
    let allFields = [this.title, this.description, this.uploader, this.uploaderId, this.timeStart, this.timeEnd];
    let valuePresent = false;
    allFields.forEach(e => {
      if (e) valuePresent = true;
    });
    if (!valuePresent)
    {
      this.invalidateInput("Invalid Input, Search requires at least one value but all fields are empty");
      return false;
    }

    return true;
  }

  formatInput(): SearchQuery {
    let searchTitle = this.title;
    let searchDescription = this.description;
    let searchUploader = this.uploader;
    if (!this.useRegex)
    {
      searchTitle = Utils.EscapeRegex(searchTitle);
      searchDescription = Utils.EscapeRegex(searchDescription);
      searchUploader = Utils.EscapeRegex(searchUploader);
    }

    return {
      title: searchTitle,
      description: searchDescription,
      uploader: searchUploader,
      uploaderId: this.uploaderId,
      timeEnd: new Date(this.timeEnd).getTime().toString(),
      timeStart: new Date(this.timeStart).getTime().toString()
    };
  }

  advancedSearch(): void {
    const validInput = this.validateInput();
    if (!validInput)
      return;
    const query: SearchQuery = this.formatInput();

    this.lastQuery = query;

    this.$refs.status.Loading("Please wait warmly while the server is processing our request");

    MetadataBackup.SearchVideos(query, (response) => {
      if (response.error) {
        this.$refs.status.Error(`Failed when executing search: ${response.errorMessage}`);
        return;
      }

      this.$refs.searchResult.showModal(this.lastQuery, response.response);
    })
  }
}
</script>
