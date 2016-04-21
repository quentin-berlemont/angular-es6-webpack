const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const postcssImport = require('postcss-import');
const postcssUrl = require('postcss-url');
const postcssCssnext = require('postcss-cssnext');

const PATHS = {
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build')
};

module.exports = {
  debug: true,
  devtool: 'eval-source-map',
  entry: {
    app: path.join(PATHS.src, 'app')
  },
  output: {
    path: PATHS.build,
    filename: '[name].bundle.js'
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
        loaders: ['style-loader', 'css-loader?sourceMap', 'postcss-loader']
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
  devServer: {
    historyApiFallback: true,
    inline: true,
    hot: true,
    stats: 'errors-only'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(PATHS.src, 'index.html')
    })
  ]
};
