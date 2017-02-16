const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scriptloader.min.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel-loader?presets[]=es2015'}
    ]
  }
}
