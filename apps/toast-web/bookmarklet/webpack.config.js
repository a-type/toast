const path = require('path');
const webpack = require('webpack');
const cors = require('@koa/cors');
const config = require('config');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

  entry: [
    'babel-polyfill',
    'resize-observer-polyfill',
    path.resolve(__dirname, './src/index.js'),
  ],
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: 'toast-bookmarklet.js',
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    alias: {
      components: path.resolve(__dirname, '../../../libs/components'),
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
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      },
      CONFIG: JSON.stringify(config),
    }),
  ],
  serve: {
    content: [path.resolve(__dirname, 'public')],
    add: (app, middleware, options) => {
      app.use(cors({ origin: '*' }));
    },
  },
};
