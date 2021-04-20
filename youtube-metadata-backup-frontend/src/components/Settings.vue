<template>
    <main id="view-settings" class="px-3 mb-somewhat">
        <h3>Settings</h3>
        <hr class="my-4">
        <div class="row">
            <div class="col-12 mb-4">
                <label for="apiKey" class="form-label lead">Youtube Data API Key</label>
                <input id="apiKey" type="text" class="form-control" placeholder="API Key">
            </div>
            <div class="col-12 mb-3">
                <label for="clientId" class="form-label lead">Client ID</label>
                <input id="clientId" type="text" class="form-control" placeholder="Client ID">
            </div>
            <hr class="my-4">
            <div class="col-12">
                <button class="btn btn-outline-secondary w-100" type="button">Apply</button>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    name: "Settings"
}
</script>
