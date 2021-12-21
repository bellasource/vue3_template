const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('./path');
const postcssConfig = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [
        [
          'postcss-preset-env',
          {
            // 其他选项
          },
        ],
      ],
    },
  },
};
module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'assets/[name].[chunkhash].js',
    chunkFilename: 'assets/[name].[chunkhash].chunk.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', postcssConfig],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          postcssConfig,
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
          {
            loader: 'style-resources-loader',
            options: {
              patterns: path.lessVariables,
              //prepend/append， 表示资源导入的位置，在样式后导入的会覆盖前面导入的
              injector: 'append',
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', postcssConfig, 'sass-loader'],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      // 压缩css，移除空格等
      new CssMinimizerPlugin(),
      // 压缩js，移除空格，打印等
      new TerserPlugin({
        terserOptions: {
          //drop_console：false默认，不移除console；drop_debugger：true默认移除debuger
          compress: { drop_console: true, drop_debugger: true },
        },
      }),
    ],
    runtimeChunk: 'single',
    splitChunks: {
      automaticNameDelimiter: '-', //默认~，vendor和名称之间分割符
      chunks: 'async', //默认值async，异步加载的模块拆包为单位bundle
      cacheGroups: {
        vendor: {
          // 第三方依赖
          priority: 1, // 设置优先级，首先抽离第三方模块
          name: 'vendor',
          test: /node_modules/,
          chunks: 'initial',
          minSize: 0,
          minChunks: 1, // 最少引入了1次
        },
        // 缓存组
        common: {
          // 公共模块
          chunks: 'initial',
          name: 'common',
          minSize: 100, // 大小超过100个字节
          minChunks: 2,
        },
      },
    },
  },
  plugins: [
    // 提取css文件，配置输出路径
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].[contenthash].css',
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: path.staticResources, to: path.outputStaticResources }],
    }),
  ],
});
