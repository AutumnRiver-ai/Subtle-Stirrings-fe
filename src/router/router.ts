
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import news from '@/views/news.vue';
import home from '@/views/home.vue';
import map from '@/views/map.vue';

const routes: Array<RouteRecordRaw> = [
    { path: "/", redirect: "/news" },
    {
        path: '/home',
        name: 'home',
        component: home
    },
    {
        path: '/news',
        name: 'news',
        component: news
    },
    {
        path: '/timemap',
        name: 'timemap',
        component: map
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;