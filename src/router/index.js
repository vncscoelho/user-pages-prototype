import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: 'Home',
    },
  },
  {
    name: 'member-list',
    path: '/member-list',
    component: () => import('@/views/MemberList.vue'),
    meta: {
      title: 'Lista de membros',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
