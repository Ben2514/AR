const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const mode = 'development';

module.exports = {
  mode: mode,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'docs'),
    // publicPath: '/AR',
    filename: 'js/index.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new CopyPlugin({
      patterns: [
        {from: './src/js', to: 'js'},
        {from: './src/vendor', to: 'vendor'},
        {from: './src/model', to: 'model'},
        {from: './src/marker', to: 'marker'},
      ],
    }),
  ],
}