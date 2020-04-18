const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const htmlWebpackPluginOptions = {
  template: "src/index.html.ejs",
  inject: "body",
  hash: true,
};

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: `${__dirname}/dist`,
    filename: "main.js",
  },
  module: {
    rules: [
      // for .ts files
      {
        test: /\.ts$/,
        use: "ts-loader",
      }
    ],
  },
  resolve: {
    modules: [
      path.resolve(__dirname, "src"),
      "node_modules",
    ],
    extensions: [".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin(htmlWebpackPluginOptions),
  ],
  devServer: {
    host: "0.0.0.0",
    port: 8080,
  }
};
