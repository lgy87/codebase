import React from "react"
import { Popover, Position } from "@blueprintjs/core"

import { ThemedButton } from "~/components/Button"
import useOrgID from "@/GZQ.NeXT/hooks/useOrgID"
import createMenu, { divider } from "./createMenu"

export default function AppStore() {
  const orgID = useOrgID()
  const menu = [
    {
      text: "申请试用商务版",
      icon: "briefcase",
      onClick() {
        alert("hahaha")
      },
    },
    divider,
    {
      text: "管理 / 增购 / 续购",
      icon: "fast-forward",
      href: `https://workbench.chanjet.com/myapp/list?orgId=${orgID}`,
      target: "_blank",
    },
  ]

  return (
    <Popover
      content={createMenu(menu)}
      minimal={true}
      hoverCloseDelay={100}
      hoverOpenDelay={0}
      position={Position.BOTTOM_RIGHT}
    >
      <AppStoreTrigger />
    </Popover>
  )
}

function AppStoreTrigger() {
  return (
    <ThemedButton
      intent="primary"
      icon="shopping-cart"
      rightIcon="chevron-down"
      text="应用中心"
    />
  )
}
