/**
 * Copyright (c) 2021, Henrik Geißler.
 */
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const SitemapPlugin = require('sitemap-webpack-plugin').default
module.exports = {
  devServer: {
    contentBase: `${__dirname}/app`,
  },
  entry: './app/js/main.js',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?importLoaders=1',
        }),
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        use: ['file-loader'],
      },
    ],
  },
  optimization: {},
  output: {
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      chunkFilename: '[id].css',
      filename: '[name].css',
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      runtimeCaching: [
        { handler: 'staleWhileRevalidate', urlPattern: new RegExp('/') },
      ],
      skipWaiting: true,
    }),
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true,
      },
      template: './app/index.html',
    }),
    new ExtractTextPlugin({
      filename: 'styles.css',
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
    }),
    new CopyWebpackPlugin(
      [
        { from: 'images/', to: 'images' },
        'decoder.js',
        'manifest.json',
        'CNAME',
      ],
      {
        context: './app',
      }
    ),
    new SitemapPlugin('https://qrcodescan.in', ['/']),
  ],
}
