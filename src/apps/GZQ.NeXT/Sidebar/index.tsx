import React, { FC, memo, useEffect } from "react"
import * as r from "ramda"
import * as ra from "ramda-adjunct"

import dataSource from "~/utils/dataSource"
import useOrgId from "~/apps/GZQ.NeXT/hooks/useOrgID"
import useUserId from "~/apps/GZQ.NeXT/hooks/useUserID"

import Sidebar2 from "@/AppTemplate/Sidebar"
import router from "@/AppTemplate/Sidebar/routers"
import { AppInfoPayload, AppItem, RouteItem, RouteList } from "./types"

const ROUTERS = "ROUTERS"

const Sidebar: FC<{}> = () => {
  const orgId = useOrgId() as string

  useEffect(() => {
    ;(async () => {
      try {
        const appItems = await dataSource<AppInfoPayload>({
          url: "/app/web/icon/lightApps",
          params: {
            orgId: orgId,
            needOptNum: false,
          },
        })
        const pick = r.pick([
          "appId",
          "ciaAppid",
          "orderBy",
          "name",
          "status",
          "platformExtension",
          "hasAuthority",
          "endTimestamp",
        ])
        const normalizeItem = ra.renameKeys({
          appId: "id",
          ciaAppid: "ciaId",
          orderBy: "order",
          platformExtension: "extension",
          hasAuthority: "authorized",
          endTimestamp: "endAt",
        })

        const items = appItems[0].appIconList
          .map(pick)
          .map(normalizeItem) as RouteList

        const routerConfig = ra.renameKeys({
          name: "label",
          id: "path",
        })(items)

        console.log(router(routerConfig))

        console.log(items)
      } catch (e) {
        console.log("catch", e)
      }
    })()
  }, [orgId])

  return <h1>{orgId}</h1>
}

export default memo(Sidebar)

const icons = {
  home: "home",
  circle: "social-media",
  chat: "chat",
}
