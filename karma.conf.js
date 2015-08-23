var webpack = require('webpack')
var path = require('path')

module.exports = function (config) {
  config.set({
    browsers: [ 'Chrome' ],
    singleRun: true,
    frameworks: [ 'mocha' ],
    files: [
      'tests.webpack.js',
    ],
    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ],
    },
    reporters: [ 'dots' ],
    webpack: {
      devtool: 'inline-source-map',
      resolve: {
        root: [path.join(__dirname, 'webpack/assets/javascripts')],
      },
      module: {
        loaders: [
          { test: /\.js$/, loader: 'babel-loader' },
        ],
      },
    },
    webpackServer: {
      noInfo: true,
    },
  })
}
