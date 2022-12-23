const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Flow Form Example App",
      template: "src/index.html",
    }),
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 4000,
  },
};
