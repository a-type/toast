const path = require('path');
const webpack = require('webpack');
const cors = require('@koa/cors');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

  entry: ['babel-polyfill', 'resize-observer-polyfill', './src/index.js'],
  output: {
    publicPath: '/',
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'toast-bookmarklet.js',
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
  plugins: [new webpack.NamedModulesPlugin()],
  serve: {
    content: [path.resolve(__dirname, 'public')],
    add: (app, middleware, options) => {
      app.use(cors({ origin: '*' }));
    },
  },
};
