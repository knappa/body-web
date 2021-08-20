import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginPage from '@/pages/LoginPage.vue';
import BodyMap from '@/pages/BodyMap.vue';
import LiteratureList from '@/pages/LiteratureList.vue';
import LandingPage from '@/pages/LandingPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage,
  },
  {
    path: '/bodymap',
    name: 'BodyMap',
    component: BodyMap,
  },
  {
    path: '/list',
    name: 'LiteratureList',
    component: LiteratureList,
    props(route) {
      return { initSearch: route.query.system };
    },
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
