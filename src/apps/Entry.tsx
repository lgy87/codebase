/*
 * Guangyao Li
 * 2019/09/02
 * lgy87@foxmail.com
 */
import { hot } from "react-hot-loader/root"
import React from "react"
import HTML5Backend from "react-dnd-html5-backend"
import { DndProvider } from "react-dnd"
import { ConnectedRouter } from "connected-react-router"

import App from "~/apps/App"
import configureStore, { history } from "~/configureStore"
import { Provider } from "react-redux"
import A from "~/components/A"
const store = configureStore({})

function Entry() {
  const [x, setX] = React.useState()
  const ok = React.useCallback(o => {
    console.log(x, o)
  }, [])

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <DndProvider backend={HTML5Backend}>
          <App />
        </DndProvider>
      </ConnectedRouter>
    </Provider>
  )
}

export default hot(Entry)
