<template>
    <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <Header :current-route="route"></Header>
        <Home :class="{ 'd-none': route && route !== 'Home'}"></Home>
        <Backup :class="{ 'd-none': route !== 'Backup'}"></Backup>
        <Search :class="{ 'd-none': route !== 'Search'}"></Search>
        <Settings :class="{ 'd-none': route !== 'Settings'}" @settingsChanged="onSettingsChanged"
                  :initialApiKey="this.currentApiKey"></Settings>
        <Footer></Footer>
    </div>
</template>

<script>
import "./assets/css/main.css"
import "./assets/css/modals.css"
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/components/Home";
import Backup from "@/components/Backup";
import BackupResultModal from "@/components/BackupResultModal";
import Search from "@/components/Search";
import Settings from "@/components/Settings";
import {GoogleAPIHandler} from "@/assets/ts/GoogleAPIHandler";

gapi.load("client:auth2", function () {
    console.log("GAPI Loaded");
    let googleApiHandler = GoogleAPIHandler.GetInstance();
    googleApiHandler.LoadYoutubeAPI(function (error, message) {
        console.log(error + message);
    })
});

export default {
    name: 'App',
    components: {
        Header,
        Footer,
        Home,
        Backup,
        BackupResultModal,
        Search,
        Settings
    },
    data: function () {
        return {
            route: window.location.hash.split("#")[1],
            currentApiKey: GoogleAPIHandler.GetInstance().getAPIKey()
        }
    },
    methods: {
        onSettingsChanged: function (settings) {
            let gapiInstance = GoogleAPIHandler.GetInstance();
            gapiInstance.setAPIKey(settings.youtubeApiKey);
            gapiInstance.LoadYoutubeAPI(function (error, message) {
                if (error)
                {
                    confirm(message);
                }
            })
        }
    },
    created() {
        let that = this;
        window.addEventListener("hashchange", function (){
            that.route = window.location.hash.split("#")[1];
        });
    }
}
</script>
