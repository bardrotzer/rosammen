const path = require('path');
const loaders = require('./loaders');
const plugins = require('./plugins')


module.exports = {
  resolve: {
    extensions: ['.js', '.html', '.svelte'],
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  mode: 'development',
  entry: {
    index: './src/main.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  /**
   * Configure the webpack dev server to run on port 8080
   * Serve files from the ./dist folder
   */
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080
  },
  module: {
    rules: [
      loaders.SvelteLoader,
      loaders.CSSLoader,
    ]
  },
  plugins: [
    plugins.miniCssExtractPlugin,
    plugins.htmlWebpackPlugin,
    plugins.copyWebpackPlugin,
    plugins.dotenv,
  ]
};
