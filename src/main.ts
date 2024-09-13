import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import * as Icons from '@ant-design/icons-vue';
import App from './App.vue'
import 'ant-design-vue/dist/reset.css'
import './style.css'
import axios from 'axios';
import {TimelineFlag, TimelineDrag} from '@/components/timeline/directives.ts'
import store from '@/store/store.ts';
import router from '@/router/router.js';

// axios.defaults.baseURL = 'http://101.42.16.7/subtle'; // 设置全局 baseURL
axios.defaults.baseURL = 'http://127.0.0.1:8012'; // 设置全局 baseURL
axios.defaults.timeout = 5 * 60 * 1000; 

const app = createApp(App);
app.directive('TimelineFlag', TimelineFlag)
app.directive('TimelineDrag', TimelineDrag)


app.use(router)
app.use(store)
app.use(Antd)
app.use(Icons)
app.mount('#app');

