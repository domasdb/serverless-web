const webpack = require('webpack');
const path = require('path');

const buildPath = path.resolve(__dirname, 'build');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

const config = {
  entry: [path.join(__dirname, '/src/app/app.jsx')],
  // Render source-map file for final build
  devtool: 'source-map',
  // output config
  output: {
    path: buildPath, // Path of output file
    filename: '[chunkhash].js', // Name of output file
  },
  plugins: [
    new WebpackCleanupPlugin(),
    // Define production build to allow React to strip out unnecessary checks
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    // Minify the bundle
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        // suppresses warnings, usually from module minification
        warnings: false,
      },
    }),
    // Allows error warnings but does not stop compiling.
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: './src/www/index.html',
    }),
    // Transfer Files
    new CopyWebpackPlugin([
      { from: 'www', ignore: 'index.html', context: path.resolve(__dirname, 'src') },
    ]),

  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/, // All .js files
        loaders: ['react-hot', 'babel?presets[]=es2015,presets[]=stage-0,presets[]=react'],
        exclude: [nodeModulesPath],
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};

module.exports = config;
