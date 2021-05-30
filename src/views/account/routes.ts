import { RouteConfig } from 'vue-router';

import Login from './SignIn.vue';
import Join from './Join.vue';

const routes: Array<RouteConfig> = [
  { name: 'login', path: '/login', component: Login },
  { name: 'join', path: '/join', component: Join },
];

export default routes;
