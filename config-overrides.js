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
  addWebpackModuleRule,
} = require("customize-cra")

const LodashModuleReplacementPlugin = require("lodash-webpack-plugin")
const r = require("ramda")
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
  addWebpackModuleRule(createSassRule()),
  addBundleVisualizer({}, true),
  // setWebpackTarget("electron-renderer"),
)

function createSassRule() {
  return {
    test: /\.scss$/i,
    use: [
      "style-loader",
      "css-loader",
      {
        loader: "sass-loader",
        options: {
          implementation: require("sass"),
          sassOptions: {
            fiber: require("fibers"),
          },
        },
      },
    ],
  }
}
