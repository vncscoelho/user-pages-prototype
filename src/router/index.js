import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '@/views/HomePage.vue';

Vue.use(VueRouter);

const routes = [
  {
    name: 'home',
    path: '/',
    component: HomePage,
    meta: {
      title: 'Home',
    },
  },
  {
    name: 'member-list',
    path: '/member-list/:page?',
    component: () => import('@/views/MemberList.vue'),
    params: {
      page: 1,
    },
    meta: {
      title: 'Lista de membros',
    },
  },
  {
    name: 'person-page',
    path: '/person/:id',
    component: () => import('@/views/PersonPage.vue'),
    params: {
      page: 1,
    },
    meta: {
      title: 'Perfil',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
