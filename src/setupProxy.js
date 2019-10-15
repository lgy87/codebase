/*
 * Guangyao Li
 * 2019/10/05
 * lgy87@foxmail.com
 */
const proxy = require("http-proxy-middleware")

const TARGET = "https://gzq.chanjet.com"

const proxyConfig = proxy({
  target: TARGET,
  changeOrigin: true,
  secure: true,
})

module.exports = function(app) {
  app
    .use("/web", proxyConfig)
    .use("/account", proxyConfig)
    .use("/quan", proxyConfig)
    .use("/app", proxyConfig)
}
