import Vue from 'vue'
import App from './App.vue'
import {BootstrapVue, IconsPlugin} from "bootstrap-vue";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/assets/css/main.css'
import {MetadataBackup} from "@/assets/ts/MetadataBackup";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false

// no trailing slashes, must contain scheme
MetadataBackup.EndPointDomain = "http://localhost:44371/";

new Vue({
  render: h => h(App),
}).$mount('#app')
