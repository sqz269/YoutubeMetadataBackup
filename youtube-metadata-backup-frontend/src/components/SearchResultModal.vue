<template>
    <div id="searchResultModal" aria-hidden="true" aria-labelledby="searchResultModalLabel" class="modal fade"
         tabindex="-1" @[`hide.bs.modal`]="propagateClose">
        <div class="modal-dialog modal-fullscreen">
            <div class="modal-content modal-dark">
                <div class="modal-header border-0">
                    <h5 id="searchResultModalLabel" class="modal-title">Search Result</h5>
                    <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"></button>
                </div>
                <div class="modal-body">
                    <div v-if="this.apiResponse.response" class="row">
                        <div class="col-md-6">
                            <button class="btn btn-outline-secondary w-100" @click="this.exportAsCSV">Export as CSV</button>
                        </div>
                        <div class="col-md-6">
                            <button class="btn btn-outline-secondary w-100" @click="this.exportAsJSON">Export as JSON</button>
                        </div>
                        <hr class="my-4">
                        <div class="col-12">
                            <p class="lead">Recorded: {{ this.apiResponse.response.videos.length }}</p>
                        </div>
                        <div class="col-12">
                            <div class="table-responsive w-100 scrollable-table" style="max-height: 50vh">
                                <table class="table table-dark">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Title</th>
                                        <th>Uploader</th>
                                        <th>Uploaded Date</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="video in this.apiResponse.response.videos">
                                        <th>{{ video.id }}</th>
                                        <td>{{ video.title }}</td>
                                        <td>
                                            <a v-bind:href="'https://www.youtube.com/channel/' + video.uploaderId" target="_blank" class="text-link-simple">
                                                {{video.uploader}}
                                            </a>
                                        </td>
                                        <td>{{ convertTimestamp(video.published) }}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <hr class="my-3">
                        <div class="col-12" v-if="this.apiResponse.response.noRecord">
                            <p class="lead">Unrecorded: {{ this.apiResponse.response.noRecord.length }}</p>
                        </div>
                        <div class="col-12" v-if="this.apiResponse.response.noRecord">
                            <div class="table-responsive w-100 scrollable-table" style="max-height: 20vh">
                                <table class="table table-dark">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="id in this.apiResponse.response.noRecord">
                                        <th>{{ id }}</th>
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
    name: "SearchResultModal",
    props: {
        showModal: Boolean,
        apiResponse: {}
    },
    methods: {
        propagateClose() {
            this.$emit("close");
        },
        convertTimestamp(timestamp) {
            let d = new Date(timestamp * 1000),	// Convert the passed timestamp to milliseconds
                yyyy = d.getFullYear(),
                mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
                dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
                hh = d.getHours(),
                h = hh,
                min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
                ampm = 'AM',
                time;

            if (hh > 12) {
                h = hh - 12;
                ampm = 'PM';
            } else if (hh === 12) {
                h = 12;
                ampm = 'PM';
            } else if (hh == 0) {
                h = 12;
            }

            // ie: 2013-02-18, 8:35 AM
            time = yyyy + '-' + mm + '-' + dd;

            return time;
        },
        exportAsFile(content, fileName) {
            let link = document.createElement("a");
            link.setAttribute("href", content);
            link.setAttribute("download", fileName);
            link.setAttribute("class", "d-none");
            document.body.appendChild(link); // Required for FF
            link.click();
            document.body.removeChild(link);
        },
        exportAsCSVNoRecord() {
            let csvRow = ["videoId"];
            csvRow.push(...this.apiResponse.response.noRecord);
            let csv = csvRow.join("\r\n");
            let data = new Blob([csv], {type: "text/csv"});
            this.exportAsFile(URL.createObjectURL(data), "export_no_records.csv");
        },
        exportAsCSVRetrieved() {
            let csvRow = [];
            // Write the header
            if (this.apiResponse.response.videos)
            {
                csvRow.push(Object.keys(this.apiResponse.response.videos[0]).join(","));
            }
            this.apiResponse.response.videos.forEach(function (e) {
                let l = [];
                for (const key of Object.keys(e)) {
                    const val = e[key];
                    // For some reason, we can't directly access val.replace because val.replace is not a function,
                    // so we gotta convert it to string first, then replace, then push to the list
                    // Also, about escaping quotes in csv:
                    // https://stackoverflow.com/questions/17808511/properly-escape-a-double-quote-in-csv
                    // Also, We didn't escape "\" , etc, because i am too lazy
                    const tmp = `${val}`.replace(/"/g, `""`).replace(/'/g, `''`);
                    l.push(`"${tmp}"`);
                }
                csvRow.push(l.join(",").replace(/(\r\n|\r|\n)/g, "\\n"))
            })
            let csv = csvRow.join("\r\n");
            let data = new Blob([csv], {type: "text/csv"});
            this.exportAsFile(URL.createObjectURL(data), "export_retrieved.csv")
        },
        exportAsCSV() {
            this.exportAsCSVRetrieved();
            this.exportAsCSVNoRecord();
        },
        exportAsJSON() {
            let data = new Blob([JSON.stringify(this.apiResponse)], { type: 'application/json' });
            this.exportAsFile(URL.createObjectURL(data), "export");
        }
    },
    watch: {
        showModal: function () {
            var modal = new bootstrap.Modal(document.getElementById("searchResultModal"), {});
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
