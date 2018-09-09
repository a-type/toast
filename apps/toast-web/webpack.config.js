const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const webpack = require('webpack');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');
const proxy = require('http-proxy-middleware');
const fs = require('fs');

module.exports = {
  mode: process.env.WEBPACK_SERVE ? 'development' : 'production',

  entry: ['babel-polyfill', 'resize-observer-polyfill', './src/index.js'],
  output: {
    publicPath: '/',
    path: path.resolve(process.cwd(), 'dist'),
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    alias: {
      components: path.resolve(__dirname, '../../libs/components'),
      'styled-components': path.resolve(
        __dirname,
        'node_modules/styled-components',
      ),
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      inject: true,
    }),
    new webpack.NamedModulesPlugin(),
    new ErrorOverlayPlugin(),
  ],
  serve: {
    content: [path.resolve(__dirname, 'public')],
    add: (app, middleware, options) => {
      app.use(convert(proxy('/api', { target: 'http://localhost:4000' })));
      app.use(convert(history()));
    },
    https: {
      key:
        process.env.SSL_KEY_PATH && fs.readFileSync(process.env.SSL_KEY_PATH),
      cert:
        process.env.SSL_CERT_PATH && fs.readFileSync(process.env.SSL_CERT_PATH),
    },
  },
};
