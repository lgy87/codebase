/*
 * Guangyao Li
 * 2019/09/02
 * lgy87@foxmail.com
 */
import React, { FC, memo, useEffect, ReactNode } from "react"

import { useToggle } from "react-use"
import { useDispatch } from "react-redux"

import { AppTemplateProps } from "./types"

import Selector from "./Selector"
import EmptyState from "./EmptyState"
import Root from "./Root"

import { setSidebar, setName, setTheme } from "./ducks"

import config from "./config"
import "./style.scss"

const App: FC<AppTemplateProps> = props => {
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

  const empty = props.children[3] || <EmptyState />

  return (
    <>
      {initialized ? <Root {...props} /> : empty}
      <Selector />
    </>
  )
}

export default App
