const webpack = require("webpack");
const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

module.exports = {
  'devtool': 'inline-source-map',
  'entry': {
    'app': [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './src/index.js'
    ]
  },
  'module': {
    'loaders': [{
      'test': /\.js$/,
      'exclude': /node_modules/,
      'loader': 'babel-loader'
    }, {
      'test': /\.css$/,
      'loader': ExtractTextPlugin.extract({ 'fallback': 'style-loader', 'use': 'css-loader?modules!postcss-loader!sass-loader'})
    }, {
      'test': /\.(eot|svg|ttf|woff)$/,
      'loader': 'file?name=static/fonts/[name].[ext]'
    }, {
      'test': /\.(jpg|png|ico)$/,
      'loader': 'file-loader?name=images/[name].[ext]'
    }, {
      'test': /(\.scss)$/,
      'loader': ExtractTextPlugin.extract({ 'fallback': 'style-loader', 'use': 'css-loader!postcss-loader!sass-loader?modules'})
    }, {
      'test': /manifest.json$/,
      'loader': 'file-loader?name=manifest.json'
    }]
  },
  'resolve': {
    'extensions': ['.js', '.sass', '.json']
  },
  'output': {
    'path': __dirname + '/public',
    'publicPath': '/',
    'filename': 'static/js/[name].[hash].js',
    'chunkFilename': 'static/js/[name].[hash].js',
  },
  'devServer': {
    'contentBase': './public',
    'hot': true
  },
  'plugins': [
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: ['vendor'],
    //   minChunks: Infinity,
    //   filename: 'static/js/[name].[hash].js',
    // }),

    new HtmlWebpackPlugin({
      'template': './index.html',
      'filename': 'index.html',
      'inject': 'body'
    }),

    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('static/css/[name].[hash].css'),

    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),

    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, './src/sw.js')
    }),

    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        postcss: [autoprefixer({
          'browsers': [
            'Android 2.3',
            'Android >= 4',
            'Chrome >= 20',
            'Firefox >= 24',
            'Explorer >= 8',
            'iOS >= 6',
            'Opera >= 12',
            'Safari >= 6'
          ]
        })]
      }
    })
  ]
};
