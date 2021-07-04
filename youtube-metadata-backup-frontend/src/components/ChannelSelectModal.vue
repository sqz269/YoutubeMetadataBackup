<template>
  <b-modal
    v-model="show"
    title="Select Channel"
    hide-footer
    header-bg-variant="dark"
    body-bg-variant="dark"
    footer-bg-variant="dark"
    header-close-content=""
  >
    <table class="table table-dark">
      <thead>
        <tr>
          <th scope="col">Channel</th>
          <th scope="col">Select</th>
        </tr>
      </thead>
      <tbody v-if="channels">
        <tr v-for="channel in channels" v-bind:key="channel.id">
          <td><img :src="channel.snippet.thumbnails.default.url" :alt="channel.snippet.title"></td>
          <td>Place Holder</td>
        </tr>
      </tbody>
    </table>

  </b-modal>
</template>

<script lang="ts">
/* eslint no-undef: 0 */

import {Component, Vue} from "vue-property-decorator";

@Component
export default class ChannelSelectModal extends Vue
{
  private channels: gapi.client.youtube.Channel[] = [];
  private callback: ((canceled: false, channel: gapi.client.youtube.Channel) => unknown)| null;
  private show = false;

  // eslint-disable-next-line no-undef
  public setChannelsToSelect(channels: gapi.client.youtube.Channel[],
                             // eslint-disable-next-line no-undef
                             callback: (canceled: false, channel: gapi.client.youtube.Channel) => unknown): void {
    console.log(channels);
    this.channels = channels;
    this.callback = callback;
    this.show = true;
  }
}
</script>
