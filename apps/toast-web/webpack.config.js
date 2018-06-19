const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    'resize-observer-polyfill',
    'react-hot-loader/patch',
    './src/index.js',
  ],
  output: {
    publicPath: '/',
    path: path.resolve(process.cwd(), 'dist'),
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
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
    new webpack.HotModuleReplacementPlugin(),
    new ErrorOverlayPlugin(),
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'public'),
    hot: true,
    overlay: true,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        secure: false,
      },
    },
  },
};
