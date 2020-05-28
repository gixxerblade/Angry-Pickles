const Dotenv = require("dotenv-webpack");
const webpack = require("webpack");

module.exports = {
  plugins: [
    new Dotenv({
      path: `./.env.production`,
    }),
    new webpack.DefinePlugin({ "global.GENTLY": false }),
  ],
};
