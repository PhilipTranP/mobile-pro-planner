// Mostly borrowed from https://github.com/coryhouse/pluralsight-redux-starter

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    path.resolve(__dirname, 'view/src/index')
  ],
  target: 'web',
  output: {
    path: __dirname + '/view/dist',
    publicPath: '/',
    filename: 'js/readable.[hash].js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'view/src'),

  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({ template: 'view/src/index.html' })
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']},
      {test: /(\.css)$/, loaders: ['style-loader', 'css-loader']},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'},
      {test: /\.(woff|woff2)$/, loader: 'file-loader'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'}
    ]
  }
};
