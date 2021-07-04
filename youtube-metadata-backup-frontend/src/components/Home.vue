<template>
  <main id="view-home" class="px-3">
    <h1>Backup Your Youtube Playlist</h1>
    <p class="lead">Tried of seeing Youtube video wiped without a trace? Spending too much time searching for that Unavailable Video? Now you can backup all the videos's metadata just in case if the video disappears.</p>
    <p class="lead">
      <a href="#Backup" class="btn btn-lg btn-secondary fw-bold border-white bg-white">Backup Playlist</a>
    </p>
    <p class="lead">
      <a href="#Search" class="btn btn-lg btn-secondary fw-bold border-white bg-white">Retrieve Data</a>
    </p>
  </main>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
  name: "Home"
})

export default class Home extends Vue {

}
</script>
