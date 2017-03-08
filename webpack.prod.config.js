const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

module.exports = {
  'devtool': 'source-map',
  'entry': {
    'app': './src/index.js'
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
    'extensions': ['.js', '.sass']
  },
  'output': {
    'path': path.resolve(__dirname, './public'),
    'publicPath': '/',
    'filename': 'static/js/[name].[chunkhash].js',
    'chunkFilename': 'static/js/[name].[chunkhash].js'
  },
  'devServer': {
    'contentBase': './public',
    'hot': true
  },
  'plugins': [
    new HtmlWebpackPlugin({
      'template': './index.html',
      'filename': 'index.html',
      'inject': 'body',
      'minify': {
        'minifyCSS': true,
        'removeEmptyAttributes': true,
        'removeComments': true
      }
    }),

    new webpack.optimize.OccurrenceOrderPlugin(),

    new ExtractTextPlugin('static/css/[name].[hash].css'),

    new webpack.optimize.UglifyJsPlugin({
      'compressor': {
        'screw_ie8': true,
        'warnings': false,
        'unused': true,
        'dead_code': true
      },
      'output': {
        'comments': false
      },
      'sourceMap': false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.AggressiveMergingPlugin(),

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
