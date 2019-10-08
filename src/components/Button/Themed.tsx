import React from "react"
import { Button } from "@blueprintjs/core"

import useTheme from "~/hooks/useTheme"

export default function(props: any) {
  const theme = useTheme()

  const style = {
    backgroundColor: theme.value,
    color: "white",
  }

  return <Button style={style} {...props} />
}
