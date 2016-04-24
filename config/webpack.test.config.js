const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.config.js');

module.exports = webpackMerge.smart(commonConfig, {
  devtool: 'inline-source-map',
  entry: {},
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'isparta',
        include: path.join(__dirname, '../src/app'),
        exclude: [
          /\.(e2e|spec)\.js$/,
        ]
      }
    ]
  }
});
