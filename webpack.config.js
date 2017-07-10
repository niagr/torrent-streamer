var path = require('path');

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
 
module.exports = {
  target: "electron",
  node: {
    __dirname: false,
    __filename: false
  },
  entry: {
      "renderer": './src/renderer.index.tsx',
      "main": './src/main.index.ts'
  },
  output: {
      path: path.join(__dirname, "build"),
      filename: "[name].bundle.js",
      devtoolModuleFilenameTemplate: '[absolute-resource-path]'
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
          test: /\.scss$/,
          loader: 'style-loader!css-loader?modules=true!sass-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  devtool: 'source-map',
  plugins: [
      new HtmlWebpackPlugin({
          template: "./src/index.html",
          chunks: ['renderer']
      })

  ]
};