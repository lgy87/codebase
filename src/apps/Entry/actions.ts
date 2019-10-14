import { createAction } from "~/utils/redux"
import { Name, Theme, Sidebar } from "~/types"

export const toggleSidebarPosition = createAction(
  "configs/sidebar/TOGGLE_SIDEBAR_POSITION",
)()
export const setSidebarRight = createAction(
  "configs/sidebar/SET_SIDEBAR_RIGHT",
)()
export const setSidebarLeft = createAction("configs/sidebar/SET_SIDEBAR_LEFT")()
export const setSidebarWidth = createAction(
  "configs/sidebar/SET_SIDEBAR_WIDTH",
)<number>()
export const setSidebar = createAction("configs/sidebar/SET_SIDEBAR")<Sidebar>()

export const setName = createAction("configs/SET_NAME")<Name>()
export const setTheme = createAction("configs/SET_THEME")<Theme>()
