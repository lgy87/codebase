import { createAction } from "~/utils/redux"
import { Name, Theme, Sidebar } from "~/types"

export const toggleSidebarPosition = createAction("TOGGLE_SIDEBAR_POSITION")()
export const setSidebarRight = createAction("SET_SIDEBAR_RIGHT")()
export const setSidebarLeft = createAction("SET_SIDEBAR_LEFT")()
export const setSidebarWidth = createAction("SET_SIDEBAR_WIDTH")<number>()
export const setSidebar = createAction("SET_SIDEBAR")<Sidebar>()

export const setName = createAction("SET_NAME")<Name>()
export const setTheme = createAction("SET_THEME")<Theme>()
