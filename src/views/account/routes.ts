import { RouteConfig } from 'vue-router';

import Login from './SignIn.vue';
import Signup from './Signup.vue';
import VerifyEmail from './VerifyEmail.vue';

const routes: Array<RouteConfig> = [
  { name: 'login', path: '/login', component: Login },
  { name: 'signup', path: '/signup', component: Signup },
  { name: 'verifyEmail', path: '/signup/verify', component: VerifyEmail },
  { name: 'register', path: '/register', redirect: '/signup' },
];

export default routes;
