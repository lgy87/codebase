import * as r from "ramda"
import * as ra from "ramda-adjunct"
import { useState, useEffect, useCallback, useMemo } from "react"

import fromElectron from "~/utils/fromElectron"
import storage from "~/utils/storage"

let index = 0
export default function(client) {
  const STORAGE_KEY = useMemo(() => getStorageKey(client), [client])
  console.log(index++)

  const [info, setInfo] = useState({})
  const [whileRemoving, setWhileRemoving] = useState(false)

  function set(info) {
    if (info) setInfo(info)
    return info
  }

  const saveToStorage = useCallback(
    value => {
      return storage.setItem(STORAGE_KEY, value)
    },
    [STORAGE_KEY],
  )

  async function removePkgs(pkg) {
    setWhileRemoving(true)
    const clientInfo = await storage.getItem(STORAGE_KEY)

    clientInfo.pkgs = r.without(ra.ensureArray(pkg), clientInfo.pkgs)
    setInfo(clientInfo)
    return saveToStorage(clientInfo).then(() => setWhileRemoving(false))
  }

  useEffect(() => {
    ;(async function() {
      Promise.race([
        storage.getItem(STORAGE_KEY),
        fromElectron.getNodeClientInfoOf(client),
      ])
        .then(set)
        .then(saveToStorage)
    })()
  }, [STORAGE_KEY, client, saveToStorage])

  return [info, whileRemoving, removePkgs]
}

const getStorageKey = r.pipe(
  r.toUpper(),
  r.concat(r.__, "_INFO"),
)
