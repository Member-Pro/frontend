import { RouteConfig } from 'vue-router';

import Login from './SignIn.vue';
import Signup from './Signup.vue';

const routes: Array<RouteConfig> = [
  { name: 'login', path: '/login', component: Login },
  { name: 'signup', path: '/signup', component: Signup },
  { name: 'register', path: '/register', redirect: '/signup' },
];

export default routes;
