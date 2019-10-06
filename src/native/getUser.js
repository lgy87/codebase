const r = require("ramda")

module.exports = async function() {
  return r.pathOr("", ["env", "USER"], process)
}
