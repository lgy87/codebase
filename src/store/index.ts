import { composeWithDevTools } from "redux-devtools-extension"
import { createStore, applyMiddleware } from "redux"

import rootReducer from "./rootReducer"
import middlewares from "./middlewares"

const composeEnhancers = composeWithDevTools({})

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares)),
)
