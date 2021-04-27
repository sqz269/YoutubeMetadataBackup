import Vue from 'vue'
import App from './App.vue'
import {Utils} from "@/assets/ts/Utils";

Vue.config.productionTip = false

if (!Utils.GetCookie("apiKey"))
{
  Utils.SetCookie("apiKey", "");
}
// @ts-ignore
window.apiEndpointDomain = "https://localhost:44371";

new Vue({
  render: h => h(App),
}).$mount('#app')
