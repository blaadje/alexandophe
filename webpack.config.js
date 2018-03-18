const path = require('path')
const port = process.env.PORT || 8080
const publicPath = `http://localhost:${port}/dist`

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          query: { compact: true } 
        }
      },
      { 
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      { test: /\.scss$/, loader: "sass-loader" }
    ]
  },
  output: {
    publicPath: `http://localhost:${port}/dist/`,
    filename: 'main.js'
  },
  devServer: {
    port,
    publicPath,
    compress: false,
    noInfo: false,
    stats: 'errors-only',
    inline: true,
    lazy: false,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: path.join(__dirname, 'dist'),
    watchOptions: {
      aggregateTimeout: 300,
      ignored: /node_modules/,
      poll: 100
    },
    historyApiFallback: {
      verbose: true,
      disableDotRule: false
    }
  }
}