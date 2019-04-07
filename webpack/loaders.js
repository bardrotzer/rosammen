const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = false; //process.env.NODE_ENV !== 'production';
const path = require('path');

const SvelteLoader =  {

  test: /\.svelte$/,
  use: {
    loader: 'svelte-loader',
    options: {
      skipIntroByDefault: true,
      nestedTransitions: true,
      // emitCss: true,
      css: false,
      hotReload: true
    }
  }
};

// const CSSLoader =       {
//   test: /\.css$/,
//   use: [
//     devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
//     "css-loader", "postcss-loader",
//     ],
// };

const CSSLoader = {
  test: /\.css$/,
  exclude: /node_modules/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: __dirname + '/../../public/css/'
      }
    },
    {
      loader: 'css-loader',
      options: {importLoaders: 1},
    },
    {
      loader: 'postcss-loader',
      options: {
        config: {
          path: __dirname + '/postcss.config.js'
        }
      },
    },
  ],
};

module.exports = {
  SvelteLoader: SvelteLoader,
  CSSLoader: CSSLoader,
};