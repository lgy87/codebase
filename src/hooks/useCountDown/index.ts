import React, { useState, useCallback } from "react"
import * as r from "ramda"

import useInterval from "~/hooks/useInterval"

const INTERVAL = 1000

type SetFn = () => void
type Result = {
  current: number
  reset: SetFn
  resume: SetFn
  pause: SetFn
}

export default function useCountDown(from: number, to: number): Result {
  const [current, setCurrent] = useState(from)
  const [delay, setDelay] = useState<number | null>(INTERVAL)

  const reset = useCallback(() => {
    setCurrent(from)
    setDelay(INTERVAL)
  }, [from])

  const pause = useCallback(() => setDelay(null), [])

  const resume = useCallback(() => {
    setDelay(INTERVAL)
  }, [])

  const countDown = useCallback(() => current > to && setCurrent(r.dec), [
    current,
    to,
  ])

  useInterval(countDown, delay)

  return { current, reset, resume, pause }
}
