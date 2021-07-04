<template>
  <table class="table table-dark" style="max-height: 400px">
    <thead>
    <tr>
      <th scope="col">{{ this.tableTitle }}</th>
    </tr>
    </thead>
    <tbody>
      <tr v-for="videoId in videoIds" v-bind:key="videoId">
        <td>{{ videoId }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class VideoIdTable extends Vue {
  @Prop()
  public videoIds: string[];

  @Prop()
  public tableTitle: string;
}
</script>

<style scoped>

</style>