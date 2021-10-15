<template>
  <div>
    <h1>Dev Tools is no more. This Is Popup! {{ now }} </h1>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default class App extends Vue {
  get now() {
    return new Date();
  }
}
</script>