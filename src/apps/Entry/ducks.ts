import * as r from "ramda"
import { handleActions, handleAction } from "redux-actions"
import { createReducer } from "~/utils/redux"
import { combineReducers } from "redux"
import {
  toggleSidebarPosition,
  setSidebarRight,
  setSidebarLeft,
  setSidebarWidth,
  setSidebar,
  setName,
  setTheme,
} from "./actions"

import { Name, Theme, Sidebar } from "~/types"
import * as configs from "~/configs"

const leftLens = r.lensProp("left")
const widthLens = r.lensProp("width")

const sidebar = handleActions(
  {
    [String(setSidebar)]: (state, action) =>
      r.mergeRight(state, r.prop("payload", action)),
    [String(setSidebarWidth)]: (state, action) =>
      r.set(widthLens, r.prop("payload", action), state),
    [String(setSidebarLeft)]: r.set(leftLens, true),
    [String(setSidebarRight)]: r.set(leftLens, false),
    [String(toggleSidebarPosition)]: r.over(leftLens, r.not),
  },
  configs.sidebar,
)

const name = handleAction(
  String(setName),
  r.pipe(
    r.nthArg(1),
    r.prop("payload"),
  ),
  configs.name,
)

// const theme = handleAction(
//   String(setTheme),
//   r.pipe(
//     r.nthArg(1),
//     r.prop("payload"),
//   ),
//   configs.theme,
// )

const theme = createReducer(configs.theme).handleAction(
  setTheme,
  r.pipe<any, any>(
    r.nthArg(1),
    r.prop("payload"),
  ),
)

export default combineReducers({
  name,
  theme,
  sidebar,
})
