import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue';
import { Auth } from 'aws-amplify';
import authConfig from './AuthConfig';
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap/scss/bootstrap.scss';
import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

Auth.configure(authConfig);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
