import { Response } from "~/types/common"

export type AppItem = {
  appId: number
  ciaAppid: number
  name: string
  orderBy: number
  status: number
  platformExtension: string
  hasAuthority: boolean
  endTimestamp: number
}
export type AppList = Array<AppItem>
export type AppInfo = {
  tagCode: string
  appIconList: AppList
}
export type AppInfoPayload = Array<AppInfo>
export type AppInfoResponse = Response<AppInfoPayload>

export type RouteItem = {
  id: number
  ciaId: number
  name: string
  order: number
  status: number
  extension: string
  authorized: boolean
  endAt: number
}
export type RouteList = Array<RouteItem>
