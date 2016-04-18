var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build')
};

var common = {
  entry: {
    app: path.join(PATHS.src, 'app')
  },
  output: {
    path: PATHS.build,
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: PATHS.src,
        loaders: ['ng-annotate', 'babel-loader']
      },
      {
        test: /\.html$/,
        loaders: ['html-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(PATHS.src, 'index.html'),
      hash: true
    })
  ]
};

if ('start' === TARGET || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      inline: true,
      hot: true,
      stats: 'errors-only'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}

if ('build' === TARGET) {
  module.exports = merge(common, {
    devtool: 'cheap-module-source-map'
  });
}
