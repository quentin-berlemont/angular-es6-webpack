var path = require('path');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');

var commonConfig = require('./common.config.js');

module.exports = webpackMerge.smart(commonConfig, {
  devtool: 'inline-source-map',
  entry: {},
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loaders: ['isparta-loader', 'eslint-loader'],
        include: path.resolve(__dirname, '../src/app'),
        exclude: /\.spec\.js$/
      }
    ]
  }
});
