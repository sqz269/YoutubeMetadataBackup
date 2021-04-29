<template>
    <div id="advancedSearchModal" aria-hidden="true" aria-labelledby="advancedSearchModalLabel" class="modal fade"
         tabindex="-1" @[`hide.bs.modal`]="propagateClose">
        <div class="modal-dialog modal-lg">
            <div class="modal-content modal-dark">
                <div class="modal-header">
                    <h5 id="advancedSearchModalLabel" class="modal-title">Advanced Search</h5>
                    <button aria-label="Close" class="btn-close btn-close-white" data-bs-dismiss="modal" type="button"></button>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="form-group mb-3">
                            <div class="row">
                                <div class="col-lg-2 my-auto">
                                    <label for="search-title" class="lead float-start">
                                        Title
                                    </label>
                                </div>
                                <div class="col-lg-10">
                                    <input v-model="title" type="text" class="form-control" id="search-title" placeholder="Video Title">
                                </div>
                            </div>
                        </div>

                        <div class="form-group mb-3">
                            <div class="row">
                                <div class="col-lg-2 my-auto">
                                    <label for="search-description" class="lead float-start">
                                        Description
                                    </label>
                                </div>
                                <div class="col-lg-10">
                                    <input v-model="description" type="text" class="form-control" id="search-description" placeholder="Video Description">
                                </div>
                            </div>
                        </div>

                        <div class="form-group mb-3">
                            <div class="row">
                                <div class="col-lg-2 my-auto">
                                    <label for="search-uploader" class="lead float-start">
                                        Uploader
                                    </label>
                                </div>
                                <div class="col-lg-10">
                                    <input v-model="uploader" :disabled="uploaderId.length > 0" type="text" class="form-control" id="search-uploader" placeholder="Uploader Username">
                                </div>
                            </div>
                        </div>

                        <div class="form-group mb-3">
                            <div class="row">
                                <div class="col-lg-2 my-auto">
                                    <label for="search-uploader-id" class="lead float-start">
                                        Uploader ID
                                    </label>
                                </div>
                                <div class="col-lg-10">
                                    <input v-model="uploaderId" :disabled="uploader.length > 0" type="text" class="form-control" id="search-uploader-id" placeholder="Uploader Channel ID">
                                </div>
                            </div>
                        </div>

                        <div class="form-group mb-3">
                            <div class="row">
                                <div class="col-lg-2 my-auto">
                                    <label for="search-start-time" class="lead float-start">
                                        Time Begin
                                    </label>
                                </div>
                                <div class="col-lg-10">
                                    <input v-model="timeStart" type="text" class="form-control" id="search-start-time" placeholder="[yyyy-mm-dd] Published Time (Greater Than)">
                                </div>
                            </div>
                        </div>

                        <div class="form-group mb-3">
                            <div class="row">
                                <div class="col-lg-2 my-auto">
                                    <label for="search-end-time" class="lead float-start">
                                        Time End
                                    </label>
                                </div>
                                <div class="col-lg-10">
                                    <input v-model="timeEnd" type="text" class="form-control" id="search-end-time" placeholder="[yyyy-mm-dd] Published Time (Lesser Than)">
                                </div>
                            </div>
                        </div>

                        <div class="form-group mb-3">
                            <div class="row">
                                <div class="col-lg-2 my-auto">
                                    <label for="search-use-regex" class="lead float-start">
                                        Use Regex
                                    </label>
                                </div>
                                <div class="col-lg-10">
                                    <div class="d-flex h-100">
                                        <input v-model="useRegex" class="form-check-input my-auto" type="checkbox" id="search-use-regex" checked>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mb-3" :class="{'d-none': !isInputInvalid}">
                            <p class="lead status-message text-danger">{{ inputInvalidReason }}</p>
                        </div>

                        <hr class="my-4">

                        <div class="mt-3">
                            <button @click="advancedSearch" class="btn btn-lg btn-outline-secondary w-100">Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {Utils} from "@/assets/ts/Utils";

export default {
    name: "AdvancedSearch",
    props: {
        showModal: Boolean,
    },
    data() {
        return {
            title: "",
            description: "",
            uploader: "",
            uploaderId: "",
            timeStart: "",
            timeEnd: "",
            useRegex: false,

            isInputInvalid: false,
            inputInvalidReason: ""
        }
    },
    methods: {
        invalidateInput: function (reason)
        {
            this.isInputInvalid = true;
            this.inputInvalidReason = reason;
        },
        isValidRegex: function (regex)
        {
            try {
                new RegExp(regex);
                return true;
            } catch (e) {
                return false;
            }
        },
        isValidTime: function (time)
        {
            return isFinite(new Date(time));
        },
        validateInput: function () {
            this.isInputInvalid = false;
            this.inputInvalidReason = "";

            if (this.useRegex)
            {
                let regexFields = {
                    "Title": this.title,
                    "Description": this.description,
                    "Uploader": this.uploader
                }

                for (let key in regexFields) {
                    if (regexFields.hasOwnProperty(key)) {
                        if (!this.isValidRegex(regexFields[key]))
                            this.invalidateInput(`Invalid Input, Value for "${key}" is not a valid regular expression`)
                    }
                }
            }

            let timeFields = {
                "Time Begin": this.timeStart,
                "Time End": this.timeEnd,
            }

            for (let key in timeFields) {
                if (timeFields.hasOwnProperty(key)) {
                    if (timeFields[key] && !this.isValidTime(timeFields[key]))
                        this.invalidateInput(`Invalid Input, Value for "${key}" is not a valid date`)
                }
            }

            if (this.uploaderId)
            {
                let idType = Utils.DetermineIdType(this.uploaderId);
                if (idType.type !== Utils.IDType.Channel)
                {
                    this.invalidateInput(`Invalid Input, Value for "Uploader ID" is not a valid Channel ID`)
                }
            }

            let allFields = [this.title, this.description, this.uploader, this.uploaderId, this.timeStart, this.timeEnd];
            let valuePresent = false;
            allFields.forEach(e => {
                if (e) valuePresent = true;
            });
            if (!valuePresent)
                this.invalidateInput("Invalid Input, Search requires at least one value but all fields are empty")
        },
        advancedSearch: function () {
            this.validateInput();
        },
        propagateClose() {
            this.$emit("close");
        }
    },
    watch: {
        showModal: function () {
            var modal = new bootstrap.Modal(document.getElementById("advancedSearchModal"), {});
            if (this.showModal)
                modal.show();
            else
                modal.hide();
        }
    }
}
</script>

<style scoped>
/*
For some reason, this css rule can only be applied to the element only if
it exists in the Vue component style tag and is scoped
*/
input[type=checkbox]
{
    border: 1px solid white;
    border-radius: 0;
    background: transparent;
    box-shadow: none !important;
}
</style>
