const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const VueClientPlugin = require('vue-server-renderer/client-plugin')
// const cdnConfig = require('../app.config').cdn
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const isDev = process.env.NODE_ENV === 'development'

const defaultPluins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  }),
  new VueClientPlugin(),
  new VueLoaderPlugin()
]

const devServer = {
  port: 8080,
  host: '0.0.0.0',
  overlay: {
    errors: true
  },
  headers: { 'Access-Control-Allow-Origin': '*' },
  historyApiFallback: {
    index: '/public/index.html'
  },
  // proxy: {
  //   '/api': 'http://127.0.0.1:3333',
  //   '/user': 'http://127.0.0.1:3333'
  // },
  hot: true
}

let config

if (isDev) {
  config = merge(baseConfig, {
    mode: 'none',
    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.less/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'less-loader'
          ]
        }
      ]
    },
    devServer,
    plugins: defaultPluins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/client-entry.js'),
      vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js',
      // publicPath: cdnConfig.host
      publicPath: '/public/'
    },
    module: {
      rules: [
        {
          test: /\.less/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'less-loader'
          ]
        }
      ]
    },
    plugins: defaultPluins.concat([
      new MiniCssExtractPlugin({
        filename: "styles.[chunkhash:8].css"
        //  　　 chunkFilename: "[id].css"
      }),
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'vendor'
      // }),
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'runtime'
      // }),
      new MiniCssExtractPlugin({
        filename: "styles.[chunkhash:8].css"
        //  　　 chunkFilename: "[id].css"
      }),
      new webpack.NamedChunksPlugin()
    ]),
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: 'initial',
            name: 'vendor'
          }
        }
      }
    }
  })
}

config.resolve = {
  alias: {
    'model': path.join(__dirname, '../client/model/client-model.js')
  }
}

module.exports = config
