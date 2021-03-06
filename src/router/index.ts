import Vue from 'vue';
import VueRouter, { Route, RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import GenericRouterView from '@/views/GenericRouterView.vue';

import AccountRoutes from '@/views/account/routes';
import authHelpers from '@/authHelpers';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/achievements',
  },

  ...AccountRoutes,

  {
    path: '/profile',
    name: 'profile',
    component: GenericRouterView,
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'profileDashboard', component: () => import('@/views/user/Profile.vue') },
      { path: 'edit', name: 'editProfile', component: () => import('@/views/user/UpdateProfile.vue') },
    ],
  },

  {
    path: '/achievements',
    name: 'achievements',
    component: GenericRouterView,
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'achievementList', component: () => import('@/views/achievements/AchievementList.vue') },
      { path: ':achievementId', name: 'achievementDetails', component: () => import('@/views/achievements/Details.vue'), props: true },
      {
        path: ':achievementId/tracker/',
        name: 'achievementTracker',
        component: () => import('@/views/achievements/Tracker2.vue'),
        props: route => ({ achievementId: parseInt(route.params.achievementId) }),
      },
    ],
  },

  {
    path: '/attachments',
    name: 'attachments',
    component: GenericRouterView,
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'attachmentList', component: () => import('@/views/attachments/Attachments.vue') },
    ],
  },

  {
    path: '/members',
    name: 'members',
    component: GenericRouterView,
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'memberList', component: () => import('@/views/members/MemberList.vue') },
      { path: ':memberId', name: 'memberProfile', component: () => import('@/views/members/ViewProfile.vue'), props: true },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'active',
});

const onAuthRequired = async (from: Route, to: Route, next: any) => {
  if (from.matched.some(record => record.meta.requiresAuth)) {
    if (await authHelpers.isAuthenticated()) {
      next();
    } else {
      next({ name: 'login' });
    }
  } else {
    next();
  }
};

router.beforeEach(onAuthRequired);

export default router;
