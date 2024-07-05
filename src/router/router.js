
import { createRouter, createWebHashHistory } from 'vue-router'
import Map from '@/views/Map.vue'; // 导入你的组件
import News from '@/views/News.vue'; // 导入你的组件
import Home from '@/views/Home.vue'; // 导入你的组件

const routes = [
    { path: "/", redirect: "/news" },
    {
        path: '/home',
        name: 'home',
        // component: Home,
        component: () => Home,
    },
    {
        path: '/news',
        name: 'news',
        // component: News,
        component: () => News,
    },
    {
        path: '/timemap',
        name: 'timemap',
        component: () => Map,
    },
];

const router = createRouter({
    history: createWebHashHistory(), // 使用 HTML5 History API
    routes,
});

console.log(router);

export default router;