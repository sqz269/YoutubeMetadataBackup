import Vue from 'vue'
import App from './App.vue'

window.apiEndpointDomain = "https://localhost:44371/";

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
