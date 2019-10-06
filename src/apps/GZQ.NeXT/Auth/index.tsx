import React from "react"
import Container from "./container"
import { Flex, Box } from "reflexbox"

export default function Auth() {
  return (
    <Flex p={2} alignItems="center" justifyContent="center" style={style}>
      <Box width={width}>
        <Container />
      </Box>
    </Flex>
  )
}

const width = [1, 2 / 3, 1 / 2, 3 / 8]
const images = [
  "https://sto.chanapp.chanjet.com/ecaf1c0b-3794-4a06-864a-17ce0d3245c3/2017/09/13/3e1d337b6e0742208f049c1dc5f9c532.jpeg",
  "https://sto.chanapp.chanjet.com/ecaf1c0b-3794-4a06-864a-17ce0d3245c3/2018/12/20/93bb0f161eb84524b78be820d8f156d5.jpg",
]

const image = images[Math.floor(Math.random() * images.length)]
const style = {
  height: "100%",
  overflow: "hidden",
  backgroundSize: "cover",
  backgroundPosition: "center center",
  backgroundImage: `url(${image})`,
}
