import { useState, useEffect } from "react"

import storage from "~/utils/storage"

export default function(key, initialValue) {
  const [state, setState] = useState(() => {
    ;(async () => {
      try {
        const value = await storage.getItem(key)
        setState(value)
      } catch {
        return initialValue
      }
    })()
  })

  useEffect(() => {
    ;(async () => {
      try {
        await storage.setItem(key, state)
      } catch {
        // do nothing
      }
    })()
  }, [key, state])
  return [state, setState]
}
