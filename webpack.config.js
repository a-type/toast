const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const fs = require('fs');
const config = require('config');
const ManifestPlugin = require('webpack-manifest-plugin');
const OfflinePlugin = require('offline-plugin');
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');

const publicPath = '/';
const publicUrl = '';
const outputPath = path.resolve(process.cwd(), 'dist');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  watch: process.env.NODE_ENV !== 'production',

  entry: [
    '@babel/polyfill',
    'resize-observer-polyfill',
    './src/index.tsx',
    'webpack-plugin-serve/client',
  ],
  output: {
    publicPath: '/',
    path: outputPath,
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
    new Serve({
      host: 'localhost',
      port: 8080,
      progress: 'minimal',
      liveReload: true,
      historyFallback: {
        rewrites: [
          {
            from: '/wps',
            to: context => context.parsedUrl.pathname,
          },
        ],
      },
      static: outputPath,
      middleware: (app, builtins) => {
        app.use(builtins.proxy('/api', { target: 'http://localhost:4000' }));
      },
    }),
  ],
};
