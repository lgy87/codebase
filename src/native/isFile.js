const ra = require("ramda-adjunct")
const fs = require("fs")

module.exports = async function(path) {
  try {
    if (ra.isTruthy(path)) {
      return await fs.statSync(path).isFile()
    }
    throw new Error("路径不能为空！")
  } catch (e) {
    return Promise.reject(e.message)
  }
}
