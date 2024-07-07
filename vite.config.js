import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // base: '/home',
  resolve: {
    extensions: ['.js', '.vue', '.json', 'jpg'],
    alias: {
      '@': '/src', // 将 @ 符号指向项目根目录下的 src 目录
      // '@': resolve(__dirname, 'src')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://geojson.cn/api/data/china.json', // 您的 GeoJSON 文件所在服务器地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // 重写路径，去除 /api 前缀
      }
    }
  }
})
