const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.config.js');
const pkg = require ('../package.json');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
        loader: ExtractTextPlugin.extract(
          'style-loader',
          ['css-loader?sourceMap', 'postcss-loader']
        )
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([commonConfig.output.path], {
      root: path.resolve(__dirname, '../')
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new WebpackMd5Hash(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    }),
    new ExtractTextPlugin('[name].[contenthash].bundle.css'),
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
