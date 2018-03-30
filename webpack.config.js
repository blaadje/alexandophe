const port = process.env.PORT || 8080

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg|ttf|eot|svg|woff)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },
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
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" }, 
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      }
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