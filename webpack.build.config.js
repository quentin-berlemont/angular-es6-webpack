const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const postcssImport = require('postcss-import');
const postcssUrl = require('postcss-url');
const postcssCssnext = require('postcss-cssnext');
const pkg = require('./package.json');

const PATHS = {
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build')
};

module.exports = {
  debug: false,
  devtool: 'source-map',
  entry: {
    app: path.join(PATHS.src, 'app'),
    vendor: Object.keys(pkg.dependencies)
  },
  output: {
    path: PATHS.build,
    filename: '[name].[chunkhash].bundle.js'
  },
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['ng-annotate-loader', 'babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loaders: ['html-loader']
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          ['css-loader?sourceMap', 'postcss-loader']
        ),
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loaders: ['file-loader?images/[name].[ext]']
      },
      {
        test: /\.(woff2?|ttf|eot|svg)$/,
        loaders: ['file-loader?fonts/[name].[ext]']
      }
    ]
  },
  postcss: function(webpack) {
    return [
      postcssImport({ addDependencyTo: webpack }),
      postcssUrl(),
      postcssCssnext()
    ];
  },
  plugins: [
    new CleanWebpackPlugin([PATHS.build]),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new WebpackMd5Hash(),
    new HtmlWebpackPlugin({
      template: path.join(PATHS.src, 'index.html')
    }),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        screw_ie8 : true
      },
      compress: {
        screw_ie8: true,
        warnings: false
      },
      comments: false
    }),
    new ExtractTextPlugin('[name].[contenthash].bundle.css')
  ]
};
