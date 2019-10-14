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
import * as configs from "~/configs"

const sidebar = createReducer(configs.sidebar)
  .handleAction(setSidebar, (_, { payload }) => payload)
  .handleAction(setSidebarWidth, (state, { payload: width }) => ({
    ...state,
    width,
  }))
  .handleAction(setSidebarLeft, state => ({ ...state, left: true }))
  .handleAction(setSidebarRight, state => ({ ...state, left: false }))
  .handleAction(toggleSidebarPosition, state => ({
    ...state,
    left: !state.left,
  }))

const theme = createReducer(configs.theme).handleAction(
  setTheme,
  (_, action) => action.payload,
)

const name = createReducer(configs.name).handleAction(
  setName,
  (_, action) => action.payload,
)

export default combineReducers({
  name,
  theme,
  sidebar,
})
