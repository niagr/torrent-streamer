var path = require('path');

var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
 
module.exports = {
  target: "electron",
  node: {
    __dirname: false,
    __filename: false
  },
  entry: {
      "renderer": './src/ts/renderer/home.tsx',
      "main": './src/ts/electron-main/app.ts'
  },
  output: {
      path: path.join(__dirname, "dist"),
      filename: "[name].bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  devtool: 'source-map',
  plugins: [
      new HtmlWebpackPlugin({
          template: "./src/html/index.html",
          chunks: ['renderer']
      })

  ]
};