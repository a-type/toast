const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const fs = require('fs');
const config = require('config');
const ManifestPlugin = require('webpack-manifest-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FaviconsPlugin = require('favicons-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
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
    './thirdParty/mixpanel.js',
    './src/index.tsx',
    process.env.NODE_ENV !== 'production'
      ? 'webpack-plugin-serve/client'
      : false,
  ].filter(Boolean),
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
        test: /\.(gif|png|jpe?g|svg|ico)$/i,
        use: ['file-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: './public/index.html',
      inject: true,
    }),
    new WebpackPwaManifest({
      name: 'Toast Cooking',
      short_name: 'Toast',
      description: 'Meal planning that makes sesne',
      background_color: '#fefeff',
      display: 'standalone',
      start_url: '.',
      theme_color: '#f6c667',
      inject: true,
      icons: [
        {
          src: path.resolve(__dirname, './public/logo_small.png'),
          sizes: [96, 128, 192, 256],
        },
        {
          src: path.resolve(__dirname, './public/logo.png'),
          sizes: [384, 512, 1024],
        },
      ],
      gcm_sender_id: '103953800507',
      share_target: {
        action: '/recipes/find',
        params: {
          title: 'title',
          text: 'text',
          url: 'url',
        },
      },
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
    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
    ...(process.env.NODE_ENV !== 'production'
      ? [
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
            static: [outputPath, './public'],
          }),
        ]
      : [
          new FaviconsPlugin({
            logo: path.resolve(__dirname, './public/logo_small.png'),
            inject: true,
          }),
        ]),
  ],
};
