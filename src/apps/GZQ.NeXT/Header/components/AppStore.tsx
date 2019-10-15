import React from "react"
import { Popover, Position, PopoverInteractionKind } from "@blueprintjs/core"

import { ThemedButton } from "~/components/Button"
import useOrgId from "@/GZQ.NeXT/hooks/useOrgId"
import createMenu, { divider } from "./createMenu"

export default function AppStore() {
  const orgId = useOrgId()
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
      href: `https://workbench.chanjet.com/myapp/list?orgId=${orgId}`,
      target: "_blank",
    },
  ]

  return (
    <Popover
      content={createMenu(menu)}
      minimal={true}
      interactionKind={PopoverInteractionKind.HOVER}
      hoverCloseDelay={100}
      hoverOpenDelay={0}
      position={Position.BOTTOM_RIGHT}
    >
      <AppStoreTrigger />
    </Popover>
  )
}

function AppStoreTrigger(props: any) {
  return (
    <ThemedButton
      intent="primary"
      icon="shopping-cart"
      rightIcon="chevron-down"
      text="应用中心"
    />
  )
}
