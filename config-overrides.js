/*
 * Guangyao Li
 * 2019/06/19
 * lgy87@foxmail.com
 */
const {
  override,
  addBabelPlugin,
  addWebpackAlias,
  addWebpackPlugin,
  addBundleVisualizer,
} = require("customize-cra")
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin")

const { SRC } = require("./webpack/paths")

module.exports = override(
  addBabelPlugin("lodash"),
  addWebpackAlias({
    "~": SRC,
    "react-dom": "@hot-loader/react-dom",
  }),
  addWebpackPlugin(new LodashModuleReplacementPlugin()),
  addBundleVisualizer({}, true),
)
