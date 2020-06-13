const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const MiniCssPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJsPlugin = require('terser-webpack-plugin');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'js/[name].[contenthash].bundle.js',
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.((c|sa|sc)ss)$/,
        use: [
          {
            loader: MiniCssPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      maxInitialRequests: Infinity,
      minSize: 0,
      chunks: 'all',
      cacheGroups: {
        reactVendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'reactVendor',
        },
        vendor: {
          test: /[\\/]node_modules[\\/](!react)(!react-dom)[\\/]/,
          name: 'vendor',
        },
      },
    },
    minimizer: [new OptimizeCssAssetsPlugin({}), new TerserJsPlugin({})],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
      minify: true,
    }),
    new MiniCssPlugin({
      filename: 'styles/[name].[hash].css',
      chunkFilename: 'styles/[name].[chunkhash:8].css',
    }),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, '../public/favicon.png'),
      publicPath: './',
      cache: true,
    }),
  ],
});
