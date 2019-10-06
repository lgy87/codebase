import * as r from "ramda"
import * as ra from "ramda-adjunct"
import { useState, useEffect } from "react"

import fromElectron from "~/utils/fromElectron"
import storage from "~/utils/storage"

const NODE_INFO = "NODE_INFO"

export default function() {
  const [info, setInfo] = useState({})
  const [whileRemoving, setWhileRemoving] = useState(false)

  function set(info) {
    if (info) setInfo(info)
    return info
  }

  function saveToStorage(value) {
    return storage.setItem(NODE_INFO, value)
  }

  async function removePkgs(pkg, clientName) {
    setWhileRemoving(true)
    const nodeInfo = await storage.getItem(NODE_INFO)
    const clientInfo = r.prop(clientName, nodeInfo)
    clientInfo.libs = r.without(ra.ensureArray(pkg), clientInfo.libs)
    setInfo(nodeInfo)
    return saveToStorage(nodeInfo).then(() => setWhileRemoving(false))
  }

  useEffect(() => {
    storage.getItem(NODE_INFO).then(set)

    fromElectron
      .getNodeInfo()
      .then(set)
      .then(saveToStorage)
  }, [])

  return info // [info, { whileRemoving, removePkgs }]
}
