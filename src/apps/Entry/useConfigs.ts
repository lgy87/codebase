import { useState, useEffect } from "react"
import { useToggle } from "react-use"

import storage from "~/utils/storage"
import { Name, Theme, Sidebar } from "~/types"
import {
  name as defaultName,
  theme as defaultTheme,
  sidebar as defaultSidebar,
} from "~/configs"

import useUserOrgsInfo from "./useUserOrgsInfo"

export const NAME = "NAME"
export const THEME = "THEME"
export const SIDEBAR = "SIDEBAR"

export default function useConfigs() {
  const [name, setName] = useState(defaultName as Name)
  const [theme, setTheme] = useState(defaultTheme as Theme)
  const [sidebar, setSidebar] = useState(defaultSidebar as Sidebar)
  const [initialized, setInitialized] = useToggle(false)

  const userOrgs = useUserOrgsInfo()

  useEffect(() => {
    ;(async () => {
      try {
        const [name, theme, sidebar] = await Promise.all([
          storage.getItem<Name>(NAME),
          storage.getItem<Theme>(THEME),
          storage.getItem<Sidebar>(SIDEBAR),
        ])

        setName(name)
        setTheme(theme)
        setSidebar(sidebar)
      } finally {
        setInitialized(true)
      }
    })()
  }, [])

  return {
    name,
    theme,
    sidebar,
    initialized,
    userOrgs,
  }
}
