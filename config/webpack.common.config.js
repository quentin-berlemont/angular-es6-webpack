const path = require('path');
const postcssImport  = require('postcss-import');
const postcssCssnext = require('postcss-cssnext');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, '../src'),
  build: path.join(__dirname, '../build')
};

module.exports = {
  entry: {
    app: path.join(PATHS.src, 'app')
  },
  output: {
    path: PATHS.build
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
        loaders: [
          'url-loader?limit=25000&name=images/[name].[ext]',
          'image-webpack?bypassOnDebug'
        ]
      },
      {
        test: /\.(woff2?|ttf|eot|svg)$/,
        loaders: [
          'url-loader?limit=25000&name=fonts/[name].[ext]'
        ]
      }
    ]
  },
  postcss: function(webpack) {
    return [
      postcssImport({ addDependencyTo: webpack }),
      postcssCssnext()
    ];
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(PATHS.src, 'index.html')
    })
  ]
};
