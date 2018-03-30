const port = process.env.PORT || 8080

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
    noInfo: false,
    stats: 'errors-only'
  }
}