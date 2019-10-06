import * as ra from "ramda-adjunct"

import { ipcRenderer } from "electron"

export default new Proxy({}, { get })

function get(target, key) {
  if (ra.isTruthy(target[key])) {
    return target[key]
  }

  target[key] = (...args) =>
    new Promise(resolve =>
      ipcRenderer.on(key, (_, resp) => resolve(resp)).send(key, ...args),
    )

  return target[key]
}
