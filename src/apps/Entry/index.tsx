/*
 * Guangyao Li
 * 2019/09/02
 * lgy87@foxmail.com
 */
import { hot } from "react-hot-loader/root"
import React from "react"
import * as ra from "ramda-adjunct"
import { Provider } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"
import HTML5Backend from "react-dnd-html5-backend"
import { DndProvider } from "react-dnd"

import store from "~/store"

import Selector from "../Selector"
import EmptyState from "../EmptyState"
import AppRoot from "./AppRoot"
import useConfigs from "./useConfigs"

import "./style.scss"
function Entry() {
  const { name, theme, sidebar, userOrgs, initialized } = useConfigs()

  if (ra.isFalsy(initialized)) return <EmptyState />

  return (
    <Provider store={store}>
      <Router>
        <DndProvider backend={HTML5Backend}>
          <AppRoot
            name={name}
            theme={theme}
            sidebar={sidebar}
            userOrgs={userOrgs}
          />
          {window.location.pathname === "/" && <EmptyState />}
          <Selector />}
        </DndProvider>
      </Router>
    </Provider>
  )
}

export default hot(Entry)
