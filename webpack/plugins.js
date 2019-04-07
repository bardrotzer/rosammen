const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');


const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: "[name].css",
  chunkFilename: "[id].css"
});

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  inject: true,
  template: './src/index.html'
});

const copyWebpackPlugin = new CopyWebpackPlugin([
  {from:'src/img', to: 'img'},
  // {from:'src/assets', to: 'assets'}
]);

const dotenv = new Dotenv();

module.exports = {
  miniCssExtractPlugin: miniCssExtractPlugin,
  htmlWebpackPlugin: htmlWebpackPlugin,
  copyWebpackPlugin: copyWebpackPlugin,
  dotenv: dotenv,
}