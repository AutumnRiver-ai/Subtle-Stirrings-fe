
// import { createRouter, createWebHashHistory } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
// import news from '@/views/news.vue'; // 导入你的组件
// import home from '@/views/home.vue'; // 导入你的组件
import map from '@/views/map.vue'; // 导入你的组件

const routes = [
    { path: "/", redirect: "/timemap" },
    // {
    //     path: '/home',
    //     name: 'home',
    //     component: home,
    //     // component: () => import(/*webpackChunkName:'home'*/ "@/views/home.vue"),
    // },
    // {
    //     path: '/news',
    //     name: 'news',
    //     component: news,
    //     // component: () => import(/*webpackChunkName:'home'*/ "@/views/news.vue"),
    // },
    {
        path: '/timemap',
        name: 'timemap',
        component: map,
        // component: () => import(/*webpackChunkName:'home'*/ "@/views/map.vue"),
    },
];


const router = createRouter({
    history: createWebHistory(), // 使用 HTML5 History API
    routes,
});

console.log(router);

export default router;