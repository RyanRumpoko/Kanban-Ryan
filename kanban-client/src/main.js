import Vue from 'vue';
import App from './App.vue';
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'

new Vue({
  render: h => h(App),
}).$mount('#app');