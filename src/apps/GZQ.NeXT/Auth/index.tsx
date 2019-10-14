import React from "react"
import { Flex, Box } from "reflexbox"
import { Redirect } from "react-router-dom"

import { name } from "../config"

import { isLoggedIntoGZQ } from "./logic"
import Container from "./container"
import style from "./style.module.scss"
import { image } from "./config"

const flexStyle = {
  backgroundImage: `url(${image})`,
}

const width = [1, 2 / 3, 1 / 2, 3 / 8]

export default function Auth() {
  return (
    <Flex
      p={2}
      alignItems="center"
      justifyContent="center"
      className={style.auth}
      style={flexStyle}
    >
      <Box width={width}>
        <Container />
        {isLoggedIntoGZQ() && <Redirect to={`/${name}`} />}
      </Box>
    </Flex>
  )
}
