import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import 'ant-design-vue/dist/reset.css'
import './style.css'
import axios from 'axios';

axios.defaults.baseURL = 'http://101.42.16.7:8019'; // 设置全局 baseURL
// axios.defaults.baseURL = 'http://127.0.0.1:8019'; // 设置全局 baseURL
axios.defaults.timeout = 5 * 60 * 1000; 

const app = createApp(App);

app.use(Antd).mount('#app');
