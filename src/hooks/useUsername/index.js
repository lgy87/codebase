import { useState, useEffect } from "react"
import * as r from "ramda"
import { usePromise } from "react-use"

import fromElectron from "~/utils/fromElectron"
import storage from "~/utils/storage"

const USER = "USER"
export default function() {
  const [username, setUsername] = useState("")
  const mounted = usePromise()

  useEffect(() => {
    ;(async () => {
      try {
        const username =
          (await mounted(storage.getItem(USER))) ||
          (await mounted(fromElectron.getUser()))

        setUsername(username)
        persist(username)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [mounted])

  return username
}

function persist(value) {
  return storage.setItem(USER, value)
}
