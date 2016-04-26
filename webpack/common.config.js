var postcssImport = require('postcss-import');
var postcssCssnext = require('postcss-cssnext');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/app/index.js'
  },
  output: {
    path: './build'
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
      template: './src/index.html'
    })
  ]
};
