import React from "react"
import { Flex, Box } from "reflexbox"
import { Redirect } from "react-router-dom"

import { isLoggedIntoGZQ } from "./logic"
import Container from "./container"

import { name } from "../config"

export default function Auth() {
  return (
    <Flex p={2} alignItems="center" justifyContent="center" style={style}>
      <Box width={width}>
        <Container />
        {isLoggedIntoGZQ() && <Redirect to={`/${name}`} />}
      </Box>
    </Flex>
  )
}

const width = [1, 2 / 3, 1 / 2, 3 / 8]
const image =
  "https://sto.chanapp.chanjet.com/ecaf1c0b-3794-4a06-864a-17ce0d3245c3/2017/09/13/3e1d337b6e0742208f049c1dc5f9c532.jpeg"

const style = {
  height: "100%",
  overflow: "hidden",
  backgroundSize: "cover",
  backgroundPosition: "center center",
  backgroundImage: `url(${image})`,
}
