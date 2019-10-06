import { useState } from "react"
import * as r from "ramda"

import getFormFieldValue from "~/utils/getFormFieldValue"

export default function(initState) {
  const [value, setValue] = useState(initState)

  const set = r.pipe(
    getFormFieldValue,
    r.values,
    r.head,
    setValue,
  )

  const reset = () => setValue(initState)

  return [value, set, reset]
}
