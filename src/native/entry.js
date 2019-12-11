/* eslint-disable @typescript-eslint/no-var-requires */
const { app, BrowserWindow, globalShortcut } = require("electron")

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) app.quit()

const r = require("ramda")
const ra = require("ramda-adjunct")
const isDev = require("electron-is-dev")

const paths = require("../../webpack/paths")
const initPlugins = require("./index")

const isDarwinEnv = r.propEq("platform", "darwin")(process)
const { default: installExtension } = require("electron-devtools-installer")

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true
let mainWindow = null

function createWindow() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
    width: 1366,
    height: 800,
    titleBarStyle: "hidden",
  })

  mainWindow.on("closed", () => (mainWindow = null))
}

app.on("ready", init)
app.on("window-all-closed", () => isDarwinEnv && app.quit())
app.on("activate", () => ra.isNull(mainWindow) && init())

/*
 * In this file you can include the rest of your app's specific main process
 * code. You can also put them in separate files and require them here.
 */
function init() {
  createWindow()
  initPlugins()
  loadWebPage()
  // openDevtools()
  register()
  installReduxExtensionToElectron()
}

function quit() {
  globalShortcut.unregisterAll()
  app.quit()
}

function register() {
  const ret = globalShortcut.register("CommandOrControl+Q", quit)
  if (!ret) {
    console.log("registration failed")
  }
}

function loadWebPage() {
  const url = isDev
    ? "http://localhost:5555/"
    : `file://${paths.DIST}/index.html`

  mainWindow.loadURL(url)
}

function openDevtools() {
  mainWindow.webContents.on("did-frame-finish-load", () => {
    if (isDev) {
      mainWindow.webContents.on("devtools-opened", mainWindow.focus)
      mainWindow.webContents.openDevTools({
        // mode: "detach",
      })
    }
  })
}

function installReduxExtensionToElectron() {
  installExtension("lmhkpmbekcpmknklioeibfkpmmfibljd")
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log("An error occurred: ", err))
}
