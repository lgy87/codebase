import { composeWithDevTools } from "redux-devtools-extension"
import { routerMiddleware } from "connected-react-router"
import { createBrowserHistory } from "history"
import { createStore, applyMiddleware } from "redux"

import createRootReducer from "./createRootReducer"
import reducers from "./reducers"
import middlewares from "./middlewares"

const composeEnhancers = composeWithDevTools({})

export const history = createBrowserHistory({
  basename: "/",
})

export default function configureStore(preloadedState: any) {
  return createStore(
    createRootReducer(history, reducers),
    preloadedState,
    composeEnhancers(
      applyMiddleware(routerMiddleware(history), ...middlewares),
    ),
  )
}
