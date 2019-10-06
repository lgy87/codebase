const ra = require("ramda-adjunct")
const { shell } = require("electron")

module.exports = async function(path) {
  try {
    if (ra.isTruthy(path)) {
      return await shell.openItem(path)
    }
    throw new Error("路径不能为空！")
  } catch (e) {
    return Promise.reject(e.message)
  }
}
