
// import { createRouter, createWebHashHistory } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import Map from '@/views/Map.vue'; // 导入你的组件
import News from '@/views/News.vue'; // 导入你的组件
import Home from '@/views/Home.vue'; // 导入你的组件

const routes = [
    { path: "/", redirect: "/news" },
    {
        path: '/home',
        name: 'home',
        // component: Home,
        component: () => import(/*webpackChunkName:'home'*/ "@/views/Home.vue"),
    },
    {
        path: '/news',
        name: 'news',
        // component: News,
        component: () => import(/*webpackChunkName:'home'*/ "@/views/News.vue"),
    },
    {
        path: '/timemap',
        name: 'timemap',
        component: () => import(/*webpackChunkName:'home'*/ "@/views/Map.vue"),
    },
];


const router = createRouter({
    history: createWebHistory(), // 使用 HTML5 History API
    routes,
});

console.log(router);

export default router;