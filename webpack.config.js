var path = require('path')

module.exports = {
  // context: __dirname,
  entry: './webpack/assets/javascripts/index.js',
  output: {
    filename: 'bundle.js',
    path: 'public/assets/javascripts',
  },
  resolve: {
    root: [
      path.join(__dirname, 'webpack/assets/javascripts'),
      path.join(__dirname, 'webpack/assets/css'),
    ],
    extensions: ['', '.js', '.jsx', '.json'],
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          optional: ['runtime', 'es7.asyncFunctions', 'es7.objectRestSpread'],
        },
      },

      {test: /\.scss$/, loader: 'style!css!sass'},
      {test: /\.css$/, loader: 'style-loader!css-loader'},

      // needed to load bootstrap's css
      {test: /\.woff2?$/, loader: 'file', query: {name: '../../assets/fonts/[hash].[ext]'}},
      {test: /\.ttf$/, loader: 'file', query: {name: '../../assets/fonts/[hash].[ext]'}},
      {test: /\.eot$/, loader: 'file', query: {name: '../../assets/fonts/[hash].[ext]'}},
      {test: /\.svg$/, loader: 'file', query: {name: '../../assets/fonts/[hash].[ext]'}},
    ],
  },
}
