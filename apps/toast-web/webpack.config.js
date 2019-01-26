const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const webpack = require('webpack');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');
const proxy = require('http-proxy-middleware');
const cors = require('@koa/cors');
const fs = require('fs');
const config = require('config');
const ManifestPlugin = require('webpack-manifest-plugin');
const OfflinePlugin = require('offline-plugin');

const publicPath = '/';
const publicUrl = '';

const createHttpsConfig = () => {
  if (fs.existsSync(path.resolve(__dirname, 'localhost.cert'))) {
    const key = fs.readFileSync(path.resolve(__dirname, 'localhost.key'));
    const cert = fs.readFileSync(path.resolve(__dirname, 'localhost.cert'));
    return {
      key,
      cert,
    };
  }

  return false;
};

module.exports = {
  mode: process.env.WEBPACK_SERVE ? 'development' : 'production',

  entry: ['babel-polyfill', 'resize-observer-polyfill', './src/index.tsx'],
  output: {
    publicPath: '/',
    path: path.resolve(process.cwd(), 'dist'),
    filename: '[name].[hash].bundle.js',
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
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
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'awesome-typescript-loader'],
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
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: ['file-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      inject: true,
    }),
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          PUBLIC_PATH: JSON.stringify(publicPath),
          PUBLIC_URL: JSON.stringify(publicUrl),
        },
      },
      CONFIG: JSON.stringify(config),
    }),
    new webpack.NamedModulesPlugin(),
    // Generate a manifest file which contains a mapping of all asset filenames
    // to their corresponding output file so that tools can pick it up without
    // having to parse `index.html`.
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
      publicPath: publicPath,
    }),
    new OfflinePlugin({
      excludes: ['**/*.map'],
      updateStrategy: 'changed',
      autoUpdate: 1000 * 60 * 2,

      ServiceWorker: {
        events: true,
        navigateFallbackURL: '/',
      },
    }),
    new ErrorOverlayPlugin(),
  ],
  serve: {
    content: [path.resolve(__dirname, 'public')],
    add: (app, middleware, options) => {
      app.use(cors({ origin: '*' }));
      app.use(convert(proxy('/api', { target: 'http://localhost:4000' })));
      app.use(
        convert(
          proxy('/bookmarklet', {
            target: 'http://localhost:9001',
            pathRewrite: path => path.replace('/bookmarklet', ''),
          }),
        ),
      );
      app.use(convert(history()));
    },
    https: createHttpsConfig(),
  },
};
