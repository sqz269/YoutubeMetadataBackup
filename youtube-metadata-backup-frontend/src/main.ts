import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
// @ts-ignore
window.apiEndpointDomain = "https://localhost:44371";

new Vue({
  render: h => h(App),
}).$mount('#app')
