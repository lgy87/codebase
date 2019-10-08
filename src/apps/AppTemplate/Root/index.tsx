import React, { FC } from "react"
import { useSelector } from "react-redux"
import * as r from "ramda"
import { Flex, Box } from "reflexbox"

import SplitPane from "../SplitPane"
import { AppTemplateProps } from "../types"
import Header from "../Header"

const Root: FC<AppTemplateProps> = ({ children }) => {
  const isSidebarLeft = useSelector(
    r.pathOr(true, ["configs", "sidebar", "left"]),
  )

  const [header, sidebar, content] = children
  const main = isSidebarLeft ? [sidebar, content] : [content, sidebar]

  return (
    <Flex className="height100" flexDirection="column">
      <Box>
        <Header>{header}</Header>
      </Box>
      <Box className="height100">
        <SplitPane isSidebarLeft>{main}</SplitPane>
      </Box>
    </Flex>
  )
}

export default Root
