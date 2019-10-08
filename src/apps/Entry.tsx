/*
 * Guangyao Li
 * 2019/09/02
 * lgy87@foxmail.com
 */
import { hot } from "react-hot-loader/root"
import React, { lazy, Suspense } from "react"
import HTML5Backend from "react-dnd-html5-backend"
import { DndProvider } from "react-dnd"
import { ConnectedRouter } from "connected-react-router"
import { Provider } from "react-redux"
import { Route } from "react-router-dom"
import { Spinner, Intent } from "@blueprintjs/core"

import configureStore, { history } from "~/configureStore"

const loading = <Spinner intent={Intent.PRIMARY} size={100} />

const GZQ = lazy(() => import("./GZQ.NeXT"))
const Pkgs = lazy(() => import("./PkgsManagement"))

const store = configureStore({})

function Entry() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <DndProvider backend={HTML5Backend}>
          <Suspense fallback={loading}>
            <Route path="/GZQ.NeXT" component={GZQ} />
            <Route path="/pkgs" component={Pkgs} />
          </Suspense>
        </DndProvider>
      </ConnectedRouter>
    </Provider>
  )
}

export default hot(Entry)
