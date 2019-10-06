const r = require("ramda")

const execCommand = require("./internal/execCommand")

module.exports = async function() {
  try {
    return await getNodeInfo()
  } catch (e) {
    return tellInstalled(false)
  }
}

async function getNodeInfo() {
  try {
    const [path, version] = await Promise.all([
      execCommand("which node"),
      execCommand("node --version"),
    ])

    return { path, version, ...tellInstalled(true) }
  } catch (e) {
    return tellInstalled(false)
  }
}

const INSTALLED = "installed"
const tellInstalled = r.objOf(INSTALLED)
