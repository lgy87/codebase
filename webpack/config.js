const { SRC } = require("./paths")

module.exports = {
  resolve: {
    alias: {
      "~": SRC,
      "@": `${SRC}/apps`,
      "react-dom": "@hot-loader/react-dom",
    },
    modules: [SRC, "node_modules"],
  },
}
