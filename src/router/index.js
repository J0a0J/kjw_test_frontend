import { createRouter, createWebHistory } from 'vue-router';
import BoardList from '../components/BoardList.vue';
import BoardDetail from '../components/BoardDetail.vue';
import BoardWritePage from '../components/BoardWritePage.vue';

const routes = [
    {
        path: '/',
        name: 'BoardList',
        component: BoardList
    },
    {
        path: '/list/:idx',
        name: 'BoardDetail',
        component: BoardDetail,
        props: true
    },
    {
        path: '/write',
        name: 'BoardWritePage',
        component: BoardWritePage,
        props: true
      }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  });
  
  export default router;