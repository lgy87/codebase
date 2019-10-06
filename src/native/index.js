const { ipcMain } = require("electron")

const pluginList = require("./list")

module.exports = function() {
  pluginList.forEach(pluginName =>
    ipcMain.on(pluginName, (event, ...args) => {
      const plugin = require(`./${pluginName}`)

      plugin(...args)
        .then(resp => event.reply(pluginName, resp))
        .catch(error => event.reply(pluginName, error))
    }),
  )
}
