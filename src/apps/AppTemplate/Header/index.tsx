import React, { FC, memo } from "react"
import { Navbar } from "@blueprintjs/core"

import useTheme from "~/hooks/useTheme"

import style from "./style.module.scss"
import { AppHeaderProps } from "../types"

const Header: FC<AppHeaderProps> = ({ children }) => {
  const theme = useTheme()
  const theStyle = {
    backgroundColor: theme.value,
  }

  return (
    <Navbar className={style.header} style={theStyle}>
      {children}
    </Navbar>
  )
}

export default memo(Header)
