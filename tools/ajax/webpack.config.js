// const uglifyjs = require('uglifyjs-webpack-plugin')
const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'src/test_ajax.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ajax.min.js'
  }, 
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel-loader?presets[]=es2015'}
    ]
  }
}
