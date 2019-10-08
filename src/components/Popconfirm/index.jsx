import React from "react"
import { Popover } from "@blueprintjs/core"

import Content from "./Content"

export default function Component({ children, ...rest }) {
  return (
    <Popover minimal content={<Content {...rest} />}>
      {children}
    </Popover>
  )
}
