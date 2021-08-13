const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename:'[name][contenthash].js',
    chunkFilename: '[name][contenthash].chunk.js',
    assetModuleFilename:'assets/images/[hash][ext][query]'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias:{
      '@components':path.resolve(__dirname,'src/components/'),
      '@styles':path.resolve(__dirname,'src/styles/'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../' // path to director where assets folder is located
            }
          },
          'css-loader',
        ],
      },
      {
        test: /\.png/,
        type:'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject:true,
      template: './public/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].[contenthash].css',
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns:[
          {
              from:path.resolve(__dirname,"src",'images'),
              to: "assets/images"
          }
      ]
  }),
    new Dotenv({
      path: './.env', // load this now instead of the ones in '.env'
      safe: false, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
      systemvars: false, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      silent: true, // hide any errors
      defaults: false, // load '.env.defaults' as the default values if empty.
    }),
    // Or: To strip all locales except “en”, “es-us” and “ru”
    // (“en” is built into Moment and can’t be removed)
    new MomentLocalesPlugin({
        localesToKeep: ['es-us', 'ru'],
    }),
  ],
  optimization:{
    minimize:true,
    minimizer:[
        new CssMinimizerPlugin(),
        new TerserPlugin()
    ]
  },  
  devServer: {
    historyApiFallback: true,
  }
};
