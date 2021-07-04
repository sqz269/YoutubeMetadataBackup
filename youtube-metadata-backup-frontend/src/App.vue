<template>
  <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
    <Navbar :current-route="this.currentView"></Navbar>
    <Home :class="{ 'd-none': currentView !== 'Home' }"></Home>
    <Backup :class="{ 'd-none': currentView !== 'Backup' }"></Backup>
    <Search :class="{ 'd-none': currentView !== 'Search' }"></Search>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import Home from "@/components/Home.vue";
import Search from "@/components/Search.vue";
import Backup from "@/components/Backup.vue";
import {GoogleAPIHandler} from "@/assets/ts/GoogleAPIHandler";

@Component({
  components: {
    Backup,
    Search,
    Home,
    Footer,
    Navbar,
  }
})
export default class App extends Vue {
  public currentView = "Home";

  mounted(): void {
    let view = window.location.hash.split("#")[1];
    if (!["Home", "Search", "Backup", "Settings"].includes(view))
    {
      view = "Home";
    }
    this.currentView = view;

    // eslint-disable-next-line no-undef
    gapi.load("client:auth2", () => {
      let googleApiHandler = GoogleAPIHandler.GetInstance();
      googleApiHandler.LoadYoutubeAPI((error, message) => {
        if (error) {
          alert(`Failed to load Youtube Data API: ${message}`)
        }
      })
    });
  }

  created(): void {
    window.addEventListener("hashchange", () => {
      this.currentView = window.location.hash.split("#")[1];
    });
  }
}
</script>
