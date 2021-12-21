const portfinder = require('portfinder');
const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { merge } = require('webpack-merge');
const apiMocker = require('mocker-api');
const common = require('./webpack.common.js');
const path = require('./path');
module.exports = new Promise((resolve, reject) => {
  portfinder
    .getPortPromise({
      port: 3021, // minimum port
      stopPort: 3999, // maximum port
    })
    .then((port) => {
      resolve(
        merge(common, {
          mode: 'development',
          devtool: 'eval-source-map',
          stats: 'errors-only',
          target: 'web',
          output: {
            filename: 'app.[hash].js',
            publicPath: '/',
          },
          devServer: {
            hot: true,
            port: port,
            host: '0.0.0.0',
            historyApiFallback: true, // 任意的 404 响应都可能需要被替代为 index.html,history模式下
            client: {
              logging: 'warn',
              overlay: false,
              progress: true,
            },
            static: {
              directory: path.root,
              publicPath: '/',
            },
            onBeforeSetupMiddleware({ app }) {
              // 配置mock
              apiMocker(app, path.mock, {
                changeHost: true,
              });
            },
            proxy: {
              '/api': {
                target: `http://0.0.0.0`,
                changeOrigin: true,
                pathRewrite: { '^/api': '' },
              },
            },
          },
          cache: {
            type: 'filesystem',
            version: `${process.env.GIT_REV}`,
            buildDependencies: {
              config: [__filename],
            },
          },
          module: {
            rules: [
              {
                test: /\.css/,
                use: ['style-loader', 'css-loader'],
              },
              {
                test: /\.less/,
                use: [
                  'style-loader',
                  'css-loader',
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
                      // prepend/append， 表示资源导入的位置，在样式后导入的会覆盖前面导入的
                      injector: 'append',
                    },
                  },
                ],
              },
              {
                test: /\.scss/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
              },
            ],
          },
          plugins: [
            new FriendlyErrorsWebpackPlugin({
              compilationSuccessInfo: {
                messages: ['No issues found.'],
              },
            }),
          ],
        }),
      );
    })
    .catch((err) => console.log(err));
});
