import { ReactNode } from "react"

type Basic = {
  label: ReactNode
  icon: string
  path: string
}

type Full = Basic & {
  id: number | string
}

type Tree<T> = T & {
  childNodes?: Array<Tree<T>>
}

export type RouteConfigItem = Tree<Basic>
export type RouteItem = Tree<Full>

export type RouteConfigList = Array<RouteConfigItem>
export type RouteList = Array<RouteItem>
