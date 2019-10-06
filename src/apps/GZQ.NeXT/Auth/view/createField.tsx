import React from "react"
import { InputGroup } from "@blueprintjs/core"

import { ConfigType } from "./types"

type InputGroupProps = React.ComponentProps<typeof InputGroup>

export default (config: ConfigType) => {
  const Field: React.FC<InputGroupProps> = props => (
    <InputGroup {...config} {...props} />
  )

  return Field
}
