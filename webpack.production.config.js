/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

// const loaders = require('./webpack.loaders');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: ['./src/entry.jsx'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[chunkhash].js',
  },
  module: {
    rules: [{
      test: /\.jsx?/,
      exclude: /node_modules/,
      use: [
        { loader: 'react-hot-loader' },
        { loader: 'babel-loader', options: { babelrc: false, presets: ['es2015', 'react'] } },
      ],
    }],
  },
  plugins: [
    new WebpackCleanupPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: { screw_ie8: true, keep_fnames: true },
      compress: { screw_ie8: true },
      comments: false,
    }),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"production"' } }),
    new HtmlWebpackPlugin({
      template: './src/template.html',
      title: 'Vito dream',
    }),
  ],
};
