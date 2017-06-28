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
      "renderer": './src/js/renderer/home.js',
      "main": './src/js/electron-main/app.js'
  },
  output: {
      path: path.join(__dirname, "dist"),
      filename: "[name].bundle.js"
  },
  module: {
    loaders: [
    //   {
    //     test: /.jsx?$/,
    //     loader: 'babel-loader',
    //     exclude: /node_modules/,
    //     query: {
    //       presets: ['es2015', 'react']
    //     }
    //   }
    ]
  },
  plugins: [
    //   new CopyWebpackPlugin([
    //       {from: "./src/js/electron-main"}
    //   ]),
      new HtmlWebpackPlugin({
          template: "./src/html/index.html",
          chunks: ['renderer']
      })

  ]
};