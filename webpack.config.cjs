const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode: 'development', // 开发模式
  entry: './src/main.js', // 入口文件
  output: {
    filename: 'bundle.js', // 输出文件名
    path: path.resolve(__dirname, 'dist'), // 输出目录
  },
  resolve: {
    extensions: ['.js', '.ts', '.vue', '.json', 'jpg'],
    alias: {
      '@': '/src', // 将 @ 符号指向项目根目录下的 src 目录
      // '@': resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/, // 处理 .vue 文件
        use: 'vue-loader',
        // options: {
        //   template: {
        //     // 使用 `vue-template-compiler` 解析模板
        //     compiler: require('vue-template-compiler'),
        //   },
        // },
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, // 处理 .css 文件
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/, // 处理图片文件
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/images', // 图片输出目录
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // 模板文件
    }),
    new VueLoaderPlugin(), // Vue Loader 插件
  ],
  devServer: {
    host: '0.0.0.0',
    // proxy: {
    //   '/api': {
    //     target: 'https://geojson.cn/api/data/china.json', // 您的 GeoJSON 文件所在服务器地址
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '') // 重写路径，去除 /api 前缀
    //   }
    // }
  },
};