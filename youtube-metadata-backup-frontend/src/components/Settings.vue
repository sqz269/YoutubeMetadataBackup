<template>
    <main id="view-settings" class="px-3 mb-somewhat">
        <h3>Settings</h3>
        <hr class="my-4">
        <div class="row">
            <div class="col-12 mb-4">
                <label for="apiKey" class="form-label lead">Youtube Data API Key</label>
                <input v-model="apiKey" id="apiKey" type="text" class="form-control" placeholder="API Key">
            </div>
            <hr class="my-4">
            <div class="col-12">
                <button @click="this.onSettingsUpdated" class="btn btn-outline-secondary w-100" type="button">Apply</button>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    name: "Settings",
    props: {
        initialApiKey: String
    },
    data: function () {
        return {
            apiKey: this.initialApiKey
        }
    },
    methods: {
        onSettingsUpdated : function () {
            let settings = {
                "youtubeApiKey": this.apiKey
            };
            this.$emit("settingsChanged", settings);
        }
    }
}
</script>
