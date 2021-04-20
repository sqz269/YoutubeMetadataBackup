<template>
    <div id="backupResultModal" aria-hidden="true" aria-labelledby="backupResultModalLabel" class="modal fade"
         tabindex="-1" @[`hide.bs.modal`]="propagateClose">
        <div class="modal-dialog modal-lg">
            <div class="modal-content modal-dark">
                <div class="modal-header">
                    <h5 id="backupResultModalLabel" class="modal-title">Backup Result</h5>
                    <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"></button>
                </div>
                <div class="modal-body">
                    <div class="row" v-if="this.apiResponse.response">
                        <div class="col-12" >
                            <p class="lead">Total Items Processed: {{ this.apiResponse.response.totalItemProcessed }}</p>
                        </div>
                        <div class="col-6">
                            <div class="scrollable-table">
                                <table class="table table-dark" style="max-height: 400px;">
                                    <thead>
                                    <tr>
                                        <th scope="col">Added {{ this.apiResponse.response.addedVideoIds.length }}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="added in this.apiResponse.response.addedVideoIds">
                                        <td>{{ added }}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="scrollable-table" style="max-height: 400px;">
                                <table class="table table-dark">
                                    <thead>
                                    <tr>
                                        <th scope="col">Failed ({{ this.apiResponse.response.failedVideoIds.length }})</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="failed in this.apiResponse.response.failedVideoIds">
                                        <td>{{ failed }}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "BackupResultModal",
    props: {
        showModal: Boolean,
        apiResponse: {}
    },
    methods: {
        propagateClose() {
            this.$emit("close");
        }
    },
    watch: {
        showModal: function () {
            var modal = new bootstrap.Modal(document.getElementById("backupResultModal"), {});
            if (this.showModal)
                modal.show();
            else
                modal.hide();
        },
        apiResponse: function () {

        }
    }
}
</script>
