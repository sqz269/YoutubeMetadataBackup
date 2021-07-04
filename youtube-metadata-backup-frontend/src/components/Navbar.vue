<template>
  <header class="mb-auto">
    <div>
      <h3 class="float-md-start mb-0">Playlist Backup</h3>
      <nav class="nav nav-masthead justify-content-center float-md-end">
        <a id="nav-location-home" class="nav-link" href="#Home" :class="{ 'active': !currentRoute || currentRoute === 'Home'}">Home</a>
        <a id="nav-location-backup" class="nav-link" href="#Backup" :class="{ 'active': currentRoute === 'Backup'}">Backup</a>
        <a id="nav-location-search" class="nav-link" href="#Search" :class="{ 'active': currentRoute === 'Search'}">Search</a>
        <a id="nav-location-settings" class="nav-link" href="#Settings" :class="{ 'active': currentRoute === 'Settings'}">Settings</a>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Navbar extends Vue {
  @Prop()
  private currentRoute!: string;
}
</script>
