const pkg = require('./package.json');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const postcssImport = require('postcss-import');
const postcssUrl = require('postcss-url');
const postcssCssnext = require('postcss-cssnext');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build')
};

const common = {
  entry: {
    app: path.join(PATHS.src, 'app')
  },
  output: {
    path: PATHS.build,
    filename: '[name].[hash].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['ng-annotate-loader', 'babel-loader'],
        include: PATHS.src
      },
      {
        test: /\.html$/,
        loaders: ['html-loader'],
        include: PATHS.src
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader'],
        include: PATHS.src
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'url-loader?limit=25000&name=images/[name].[hash].[ext]',
          'image-webpack-loader'
        ],
        include: PATHS.src
      }
    ]
  },
  postcss: function(webpack) {
    return [
      postcssImport({ addDependencyTo: webpack }),
      postcssUrl(),
      postcssCssnext()
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(PATHS.src, 'index.html')
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
  module.exports = merge.smart(common, {
    entry: {
      vendor: Object.keys(pkg.dependencies)
    },
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract(
            'style-loader',
            ['css-loader', 'postcss-loader']
          ),
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin([PATHS.build]),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new ExtractTextPlugin('[name].[contenthash].css')
    ]
  });
}
