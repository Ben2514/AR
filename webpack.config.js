const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");


module.exports  = (env) => {
  return {
    mode: env.prod ? 'production' : 'development',
    entry: {
      index: './src/index.js',
      gesture: './src/js/gesture.js'
    },
    output: {
      path: path.resolve(__dirname, 'docs'),
      // publicPath: '/AR',
      filename: 'js/[name].js',
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
        template: './src/iot.html',
        filename: 'iot.html',
      }),
      new HtmlWebpackPlugin({
        template: './src/bio.html',
        filename: 'bio.html',
      }),
      new CopyPlugin({
        patterns: [
          {from: './src/vendor', to: 'vendor'},
          {from: './src/model', to: 'model'},
          {from: './src/marker', to: 'marker'},
        ],
      }),
    ],
  }
}