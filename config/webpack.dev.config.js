const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.config.js');

module.exports = webpackMerge.smart(commonConfig, {
  debug: true,
  devtool: 'eval-source-map',
  output: {
    filename: '[name].bundle.js'
  },
  devServer: {
    historyApiFallback: true,
    inline: true,
    hot: true,
    stats: 'errors-only'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({
      multiStep: true
    })
  ]
});
