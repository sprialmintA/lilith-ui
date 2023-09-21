import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '首页',
      has: {
        header: false,
      },
    },
    component: () => import('@/components/HelloWorld.vue'),
  },
  {
    path: '/error',
    name: 'error',
    meta: {
      title: '出错了',
    },
    component: () => import('@/components/HelloWorld.vue'),
  },
  // {
  //   path: '*',
  //   name: 'notFound',
  //   meta: {
  //     title: '找不到页面',
  //   },
  //   component: () => import('@/components/HelloWorld.vue'),
  // },
];
export default routes;
