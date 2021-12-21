import { createRouter, createWebHistory } from 'vue-router';
const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "route-home" */ '@src/views/home'),
    redirect: 'test',
    children: [
      {
        path: '/test',
        name: 'test',
        component: () => import(/* webpackChunkName: "route-list" */ '@src/views/test'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import(/* webpackChunkName: "route-self" */ '@src/views/404'),
  },
];
export default createRouter({
  history: createWebHistory(),
  routes,
});
