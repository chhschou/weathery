const path = require('path')
const webpack = require('webpack')
const config = require('dotenv').config()
const ExtractTextPlugin = require('extract-text-webpack-plugin')


module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, "../public"),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1, sourceMap: true } },
            { loader: 'postcss-loader', options: { sourceMap: true } }
          ]
        })
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader'
        }],
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'node_modules',
      'client',
      'common'
    ]
  },
  devtool: 'source-map',
  node: { fs: 'empty' },
  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new webpack.DefinePlugin({
      'process.env.OPENWEATHERMAP_APIKEY': JSON.stringify(process.env.OPENWEATHERMAP_APIKEY),
      'process.env.G_GEOCODE_APIKEY': JSON.stringify(process.env.G_GEOCODE_APIKEY),
      'process.env.SIMULATE_API': JSON.stringify(process.env.SIMULATE_API)
    })
  ]
}