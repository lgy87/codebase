import * as r from "ramda"
import { createActions, handleActions, handleAction } from "redux-actions"

import { combineReducers } from "redux"
import * as configs from "~/configs"

export type Name = {
  name: string
}
export type Theme = {
  value: string
  name: string
}
export type Sidebar = {
  width: number
  minWidth: number
  maxWidth: number
  left: boolean
}

const leftLens = r.lensProp("left")
const widthLens = r.lensProp("width")

export const {
  setSidebar,
  setSidebarWidth,
  setSidebarLeft,
  setSidebarRight,
  toggleSidebarPosition,
} = createActions(
  "SET_SIDEBAR",
  "SET_SIDEBAR_WIDTH",
  "SET_SIDEBAR_LEFT",
  "SET_SIDEBAR_RIGHT",
  "TOGGLE_SIDEBAR_POSITION",
)

export const { setName, setTheme } = createActions("SET_NAME", "SET_THEME")

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
const theme = handleAction(
  String(setTheme),
  r.pipe(
    r.nthArg(1),
    r.prop("payload"),
  ),
  configs.theme,
)

export default combineReducers({
  name,
  theme,
  sidebar,
})
