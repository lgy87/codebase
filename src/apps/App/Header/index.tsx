import React, { FC, memo } from "react"
import { Navbar, Alignment } from "@blueprintjs/core"

import ImageWithText from "~/components/ImageWithText"
import useTheme from "~/hooks/useTheme"

import config from "./config"
import style from "./style.module.scss"

const Header: FC<{}> = () => {
  const theme = useTheme()
  const theStyle = {
    backgroundColor: theme.value,
  }

  return (
    <Navbar className={style.header} style={theStyle}>
      <Navbar.Group align={Alignment.LEFT}>
        <ImageWithText
          src={config.logo}
          text={config.title}
          className={style.logo}
        />
      </Navbar.Group>
    </Navbar>
  )
}

export default memo(Header)
