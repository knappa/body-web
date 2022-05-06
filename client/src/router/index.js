import Vue from 'vue';
import VueRouter from 'vue-router';
import BodyMap from '../components/BodyMap.vue';
import LiteratureList from '../components/LiteratureList.vue';
import PersonelList from '../components/PersonelList.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
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
    path: '/people',
    name: 'PersonelList',
    component: PersonelList,
    props(route) {
      return { initSearch: route.query.system };
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
