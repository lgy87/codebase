const ra = require("ramda-adjunct")

const execCommand = require("./internal/execCommand")

module.exports = async function(parent) {
  try {
    if (ra.isTruthy(parent)) {
      return (await execCommand(`ls ${parent}`)).split("\n")
    }
    throw new Error("路径不能为空！")
  } catch (e) {
    return Promise.reject(e.message)
  }
}
