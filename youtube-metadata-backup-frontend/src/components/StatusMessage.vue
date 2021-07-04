<template>
  <div class="d-flex align-items-center mt-4" :class="{'d-none': !show}">
    <p class="lead status-message" :class="{'text-danger': isError}">
      {{ statusMessage }}
      <a v-if="this.showDetails" class="text-link-simple" @click="showDetails">Details</a>
    </p>
    <div class="ms-auto">
      <div class="spinner-border ms-auto" role="status" aria-hidden="true" :class="{'d-none': !isProcessing}"></div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class StatusMessage extends Vue {
  private show = false;
  private isError = false;
  private isProcessing = false;
  private statusMessage = "";
  private showDetails: (() => unknown) | null = null;

  public ResetStatus(): void {
    this.show = false;
    this.isError = false;
    this.isProcessing = false;
    this.statusMessage = "";
    this.showDetails = null;
  }

  public Error(message: string): void {
    this.ResetStatus();

    this.show = true;
    this.statusMessage = message;
    this.isError = true;
  }

  public Loading(message: string): void {
    this.ResetStatus();

    this.show = true;
    this.statusMessage = message;
    this.isProcessing = true;
  }

  public Info(message: string): void {
    this.ResetStatus();

    this.show = true;
    this.statusMessage = message;
  }

  public Details(message: string, callback: () => unknown): void {
    this.Info(message);
    this.showDetails = callback;
  }
}
</script>
