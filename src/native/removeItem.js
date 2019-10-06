const ra = require("ramda-adjunct")
const fs = require("fs")
const util = require("util")

const rmdir = util.promisify(fs.rmdir)

module.exports = async function(path) {
  try {
    if (ra.isTruthy(path)) {
      return await rmdir(path)
    }
    throw new Error("路径不能为空！")
  } catch (e) {
    return Promise.reject(e.message)
  }
}
