import { useState, useEffect } from "react"
import { useToggle } from "react-use"

import storage from "~/utils/storage"
import { Name, Theme, Sidebar } from "~/types"
import { theme as defaultTheme, sidebar as defaultSidebar } from "~/configs"

export const NAME = "NAME"
export const THEME = "THEME"
export const SIDEBAR = "SIDEBAR"

export default function useConfig() {
  const [name, setName] = useState<Name>("")
  const [theme, setTheme] = useState(defaultTheme)
  const [sidebar, setSidebar] = useState(defaultSidebar)
  const [initialized, setInitialized] = useToggle(false)

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
  }
}
