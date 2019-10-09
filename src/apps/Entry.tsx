/*
 * Guangyao Li
 * 2019/09/02
 * lgy87@foxmail.com
 */
import { hot } from "react-hot-loader/root"
import React, { lazy, Suspense, useEffect, useState } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import HTML5Backend from "react-dnd-html5-backend"
import { DndProvider } from "react-dnd"
import { Provider } from "react-redux"
import { Route, Redirect } from "react-router-dom"
import { Spinner, Intent } from "@blueprintjs/core"

import store from "~/store"
import storage from "~/utils/storage"
import { NAME } from "./AppTemplate/config"

const loading = <Spinner intent={Intent.PRIMARY} size={100} />

const GZQ = lazy(() => import("./GZQ.NeXT"))
const Pkgs = lazy(() => import("./PkgsManagement"))
const Selector = lazy(() => import("./Selector"))

function Entry() {
  const [lastOpenApp, setLastOpenApp] = useState()
  const [basename, setBasename] = useState("/")

  useEffect(() => {
    ;(async () => {
      try {
        const appName = await storage.getItem(NAME)
        setLastOpenApp(appName)
      } catch {}
    })()
  }, [])

  return (
    <Provider store={store}>
      <Router basename={basename}>
        <DndProvider backend={HTML5Backend}>
          <Suspense fallback={loading}>
            <Route sensitive path="/GZQ.NeXT" component={GZQ} />
            <Route sensitive path="/pkgs" component={Pkgs} />
            <Redirect to={lastOpenApp} />
            <Route component={Selector} />
          </Suspense>
        </DndProvider>
      </Router>
    </Provider>
  )
}

export default hot(Entry)
