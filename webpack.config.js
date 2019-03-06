const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const HtmlWebpackPlugin = require('style-loader');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  resolve: {
    extensions: ['.js', '.html'],
    alias: {
      '@': path.resolve(__dirname, 'src')
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
      {
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
      },
      {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          "css-loader", "postcss-loader",
          ],
      },
      // {
      //   test: /\.css$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: 'css-loader',
      //   }),
      // },
    //   {
    //     test: /\.css$/,
    //     use: [
    //       /**
    //        * MiniCssExtractPlugin doesn't support HMR.
    //        * For developing, use 'style-loader' instead.
    //        * */
    //       prod ? MiniCssExtractPlugin.loader : 'style-loader',
    //       'css-loader'
    //     ]
    //   }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: './src/index.html'
    })
  ]
};



// const webpack = require('webpack');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// const mode = process.env.NODE_ENV || 'development';
// const prod = mode === 'production';

// module.exports = {
// 	entry: {
// 		bundle: ['./src/main.js']
// 	},
// 	resolve: {
// 		extensions: ['.js', '.html']
// 	},
// 	output: {
// 		path: __dirname + '/public',
// 		filename: '[name].js',
// 		chunkFilename: '[name].[id].js'
// 	},
// 	module: {
// 		rules: [
// 			{
// 				test: /\.html$/,
// 				exclude: /node_modules/,
// 				use: {
// 					loader: 'svelte-loader',
// 					options: {
// 						skipIntroByDefault: true,
// 						nestedTransitions: true,
// 						emitCss: true,
// 						hotReload: true
// 					}
// 				}
// 			},
// 			{
// 				test: /\.css$/,
// 				use: [
// 					/**
// 					 * MiniCssExtractPlugin doesn't support HMR.
// 					 * For developing, use 'style-loader' instead.
// 					 * */
// 					prod ? MiniCssExtractPlugin.loader : 'style-loader',
// 					'css-loader'
// 				]
// 			}
// 		]
// 	},
// 	mode,
// 	plugins: [
// 		new MiniCssExtractPlugin({
// 			filename: '[name].css'
// 		})
// 	],
// 	devtool: prod ? false: 'source-map'
// };