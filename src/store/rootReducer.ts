import { combineReducers } from "redux"

import configs from "@/Entry/reducers"
import gzq from "@/GZQ.NeXT/reducers"

export default combineReducers({
  configs,
  gzq,
})
