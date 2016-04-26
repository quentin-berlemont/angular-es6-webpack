var pkg = require ('../package.json');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var Md5HashWebpackPlugin = require('webpack-md5-hash');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

var commonConfig = require('./common.config.js');

module.exports = webpackMerge.smart(commonConfig, {
  devtool: 'source-map',
  entry: {
    vendor: Object.keys(pkg.dependencies)
  },
  output: {
    filename: '[name].[chunkhash].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextWebpackPlugin.extract(
          'style-loader',
          ['css-loader?sourceMap', 'postcss-loader']
        )
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([commonConfig.output.path]),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new Md5HashWebpackPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    }),
    new ExtractTextWebpackPlugin('[name].[contenthash].bundle.css'),
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        screw_ie8 : true
      },
      compress: {
        screw_ie8: true,
        warnings: false
      },
      comments: false
    })
  ]
});
