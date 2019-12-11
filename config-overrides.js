/* eslint-disable @typescript-eslint/no-var-requires */
/*
 * Guangyao Li
 * 2019/06/19
 * lgy87@foxmail.com
 */
const {
  override,
  addBabelPlugin,
  addWebpackAlias,
  // setWebpackTarget,
  addWebpackPlugin,
  addBundleVisualizer,
} = require("customize-cra")
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin")
const { SRC } = require("./webpack/paths")

module.exports = override(
  addBabelPlugin("lodash"),
  addWebpackAlias({
    "~": SRC,
    "@": "~/apps",
    "@styles": "~/styles",
    "react-dom": "@hot-loader/react-dom",
  }),
  addWebpackPlugin(new LodashModuleReplacementPlugin()),
  addBundleVisualizer({}, true),
  // setWebpackTarget("electron-renderer"),
)
