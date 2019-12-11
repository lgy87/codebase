import React, { FC, memo, ComponentProps, CSSProperties } from "react"
import { Button } from "@blueprintjs/core"

import useTheme from "~/hooks/useTheme"

type Props = ComponentProps<typeof Button>

const Themed: FC<Props> = props => {
  const theme = useTheme()

  const style: CSSProperties = {
    backgroundColor: theme.value,
    color: "white",
  }

  return <Button style={style} {...props} />
}

export default memo(Themed)
