import Vue from 'vue'
import BootstrapVue, { IconsPlugin } from 'bootstrap-vue';
import { Auth } from 'aws-amplify';
import VueLuxon from 'vue-luxon';
import authConfig from './AuthConfig';
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap/scss/bootstrap.scss';
import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.use(VueLuxon);

Vue.config.productionTip = false;

Auth.configure(authConfig);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

// Clear the console on HMR reload
// https://stackoverflow.com/a/53867503/976042
window.addEventListener('message', (e) => {
  if (e.data && typeof e.data === 'string' && e.data.match(/webpackHotUpdate/)) {
    console.log('hot reload happened')
    console.clear()
  }
});
