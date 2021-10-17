module.exports = {
  target: "node",
  devtool: "source-map",
  entry: {
    main: "./src/main",
  },
  module: {
    rules: [
      { test: /\.tsx?$/, exclude: /\/node_modules\//, loader: "babel-loader" },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
