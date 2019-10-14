/*
 * Guangyao Li
 * 2019/09/02
 * lgy87@foxmail.com
 */
import { hot } from "react-hot-loader/root"
import React from "react"
import { Provider } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"
import HTML5Backend from "react-dnd-html5-backend"
import { DndProvider } from "react-dnd"

import store from "~/store"

import Selector from "../Selector"
import AppRoot from "./AppRoot"
import "./style.scss"

function Entry() {
  return (
    <Provider store={store}>
      <Router>
        <DndProvider backend={HTML5Backend}>
          <AppRoot />
          <Selector />
        </DndProvider>
      </Router>
    </Provider>
  )
}

export default hot(Entry)
