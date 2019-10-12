/*
 * Guangyao Li
 * 2019/09/02
 * lgy87@foxmail.com
 */
import React, { FC, memo, useEffect, ReactNode } from "react"
import * as r from "ramda"
import { Flex, Box } from "reflexbox"

import { useSelector, useDispatch } from "react-redux"

import EmptyState from "@/EmptyState"
import { AppTemplateProps } from "./types"

import Header from "./Header"
import SplitPane from "./SplitPane"

const emptyState = <EmptyState />
const App: FC<AppTemplateProps> = ({ children }) => {
  const isSidebarLeft = useSelector(
    r.pathOr(true, ["configs", "sidebar", "left"]),
  )

  const [header, sidebar, content, empty = emptyState] = children
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

export default App
