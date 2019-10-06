import React, { FC, memo } from "react"
import { Navbar, Alignment } from "@blueprintjs/core"

import ImageWithText from "~/components/ImageWithText"
import useTheme from "~/hooks/useTheme"

import config from "./config"
import styles from "./style.module.scss"

const Header: FC<{}> = () => {
  const theme = useTheme()
  const style = {
    backgroundColor: theme.value,
  }

  return (
    <Navbar className={styles.header} style={style}>
      <Navbar.Group align={Alignment.LEFT}>
        <ImageWithText
          src={config.logo}
          text={config.title}
          className={styles.logo}
        />
      </Navbar.Group>
    </Navbar>
  )
}

export default memo(Header)
