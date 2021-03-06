const path = require('path')
const port = process.env.PORT || 8080

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      assets: path.resolve(__dirname, 'src/assets/')
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|svg|ttf|eot|svg|mp3|woff)$/,
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
        test: /\.(scss|css)$/,
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