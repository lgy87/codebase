import React from "react"
import {
  Popover,
  Button,
  Position,
  PopoverInteractionKind,
} from "@blueprintjs/core"

import createMenu, { divider } from "./createMenu"

export default function AppStore(props) {
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
      href: `https://workbench.chanjet.com/myapp/list?orgId=${props.org}`,
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
      position={Position.BOTTOM}
    >
      <Button
        intent="primary"
        icon="shopping-cart"
        rightIcon="chevron-down"
        text="应用中心"
        style={style}
      />
    </Popover>
  )
}

const style = {
  color: "white",
}
