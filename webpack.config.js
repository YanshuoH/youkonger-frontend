var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var isProd = process.env.NODE_ENV === 'prod';
var plugins = [
  new webpack.DefinePlugin({
    __DEBUG__: !isProd
  }),
  new ExtractTextPlugin('weui.min.css'),
  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, 'src/index.html'),
    hash: true,
  }),
  new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/)
];
if (isProd) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    comments: /contain no comment/,
    // mangle: false,
    compress: {
      sequences: false,  // join consecutive statemets with the “comma operator”
      properties: false,  // optimize property access: a['foo'] → a.foo
      dead_code: false,  // discard unreachable code
      drop_debugger: false,  // discard “debugger” statements
      unsafe: false, // some unsafe optimizations (see below)
      conditionals: false,  // optimize if-s and conditional expressions
      comparisons: false,  // optimize comparisons
      evaluate: false,  // evaluate constant expressions
      booleans: true,  // optimize boolean expressions
      loops: true,  // optimize loops
      unused: false,  // drop unused variables/functions
      hoist_funs: true,  // hoist function declarations
      hoist_vars: true, // hoist variable declarations
      if_return: true,  // optimize if-s followed by return/continue
      join_vars: true,  // join var declarations
      cascade: false,  // try to cascade `right` into `left` in sequences
      side_effects: false,  // drop side-effect-free statements
      warnings: true,  // warn about potentially dangerous optimizations/code
      global_defs: {},     // global definitions
    },
  }));
}

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    js: ['./app.js'],
    vendor: ['react']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/assets/',
  },
  devtool: 'source-map',
  devServer: {
    hot: true,
    host: '0.0.0.0',
    watchOptions: {
      poll: 1000,
    },
    port: 8112,
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
  plugins: plugins,
};
