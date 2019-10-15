import React, { FC, memo, useEffect } from "react"

import dataSource from "~/utils/dataSource"
import useOrgId from "@/GZQ.NeXT/hooks/useOrgId"

import { AppInfoPayload } from "./types"

const Sidebar: FC<{}> = () => {
  const orgId = useOrgId() as string

  useEffect(() => {
    ;(async () => {
      const appItems = await dataSource.get<AppInfoPayload>(
        "/app/web/icon/lightApps",
        {
          params: {
            orgId: orgId,
            needOptNum: false,
          },
        },
      )
    })()
  }, [orgId])

  return <h1>{orgId}</h1>
}

export default memo(Sidebar)
