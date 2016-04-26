var webpack = require('webpack');
var webpackMerge = require('webpack-merge');

var commonConfig = require('./common.config.js');

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
