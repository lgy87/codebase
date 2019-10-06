import { RouteConfigItem, RouteConfigList } from "./types"

const info = {
  label: "Info",
  icon: "info-sign",
  path: "info",
  childNodes: [
    {
      label: "CPU",
      icon: "layout-circle",
      path: "cpu",
    },
    {
      label: "Battery",
      icon: "history",
      path: "battery",
    },
  ],
}

const settings: RouteConfigItem = {
  label: "Settings",
  icon: "settings",
  path: "settings",
}

export default [info, settings] as RouteConfigList
