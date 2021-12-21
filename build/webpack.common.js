const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// vue-loader 插件, 需配合 @vue/compiler-sfc 一块使用
const { VueLoaderPlugin } = require('vue-loader/dist/index');
const path = require('./path');
module.exports = {
  entry: {
    app: path.entry,
  },
  output: {
    path: path.output,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@src': path.src,
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['thread-loader', 'babel-loader'],
      },
      {
        test: /\.vue$/,
        use: ['vue-loader'],
        include: path.src,
      },
      // {
      //   test: /\.html$/,
      //   // 处理html文件中的资源
      //   use: ['html-loader'],
      // },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        // 使用内置的资源模块
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 默认8kb内的资源转base64
          },
        },
        generator: {
          filename: 'images/[name].[hash][ext][query]',
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
        generator: {
          filename: 'media/[name].[hash][ext][query]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
        generator: {
          filename: 'font/[name].[hash][ext][query]',
        },
      },
    ],
  },
  plugins: [
    // 编译vue文件
    new VueLoaderPlugin(),
    // 打包html文件
    new HtmlWebpackPlugin({
      template: path.template,
      favicon: path.favicon,
      filename: 'index.html',
    }),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: JSON.stringify(true),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
    }),
  ],
};
