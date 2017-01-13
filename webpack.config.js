var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    js: ['babel-polyfill', './app.js'],
    vendor: ['react']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
  devServer: {
    hot: true,
    host: '0.0.0.0',
    watchOptions: {
      poll: 1000,
    },
    port: 8112,
    publicPath: '/',
    proxy: {
      '/api/**': {
        target: 'http://localhost:8111'
      }
    },
    historyApiFallback: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
        }
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        configFile: path.join(__dirname, '.eslintrc')
      },
      {
        test: /\.less$/,
        loader: 'style!css!postcss!less'
      },
      {
        test: /\.css/,
        loader: ExtractTextPlugin.extract('style', 'css', 'postcss')
      },
      {
        test: /\.(png|jpg|svg)$/,
        loader: 'url?limit=25000'
      },
      {
        test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
        loader: 'file',
      },
    ]
  },
  postcss: [autoprefixer],
  plugins: [
    new webpack.DefinePlugin({
      __DEBUG__: process.env.NODE_ENV !== 'prod'
    }),
    new ExtractTextPlugin('weui.min.css'),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html')
    })
  ]
};
