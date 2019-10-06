/*
 * Guangyao Li
 * 2019/09/02
 * lgy87@foxmail.com
 */
import React, { memo, useEffect } from "react"
import * as r from "ramda"
import { Flex, Box } from "reflexbox"
import { useToggle } from "react-use"
import { useSelector, useDispatch } from "react-redux"

import Header from "./Header"
import Content from "./Content"
import Sidebar from "./Sidebar"
import Selector from "./Selector"
import SplitPane from "./SplitPane"
import EmptyState from "./EmptyState"
import Auth from "@/GZQ.NeXT/Auth"

import { setSidebar, setName, setTheme } from "./ducks"

import config from "./config"
import "./style.scss"

const sidebar = <Sidebar key="sidebar" />
const content = <Auth key="ok" /> //<Content key="content" />

function Root() {
  const isSidebarLeft = useSelector(
    r.pathOr(true, ["configs", "sidebar", "left"]),
  )

  const children = isSidebarLeft ? [sidebar, content] : [content, sidebar]

  return (
    <Flex className="height100" flexDirection="column">
      <Box>
        <Header />
      </Box>
      <Box className="height100">
        <SplitPane isSidebarLeft>{children}</SplitPane>
      </Box>
    </Flex>
  )
}

function App() {
  const [initialized, setInitialized] = useToggle(false)
  const dispatch = useDispatch()

  useEffect(() => {
    ;(async () => {
      try {
        const { name, theme, sidebar } = await config()
        dispatch(setName(name))
        dispatch(setSidebar(sidebar))
        dispatch(setTheme(theme))
      } finally {
        setInitialized(true)
      }
    })()
  }, [dispatch, setInitialized])

  return (
    <>
      {initialized ? <Root /> : <EmptyState />}
      <Selector />
    </>
  )
}

export default memo(App)
