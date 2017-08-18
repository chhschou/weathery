var webpack = require('webpack')
require('dotenv').config()

module.exports = {
  entry: './client/index.js',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
  node: {fs: 'empty'},
  plugins: [
    new webpack.DefinePlugin({
      'process.env.OPENWEATHERMAP_APIKEY': JSON.stringify( process.env.OPENWEATHERMAP_APIKEY)
    })
  ]
}