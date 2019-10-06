import React from "react"
import { Popover, Position, PopoverInteractionKind } from "@blueprintjs/core"

import Avatar from "~/components/Avatar"
import auth from "~/utils/auth"
import toaster from "~/utils/toaster"
import { navigate } from "~/utils/router"
import createMenu, { divider } from "./createMenu"

const menu = [
  { text: "个人主页", icon: "person" },
  divider,
  { text: "手机端下载", icon: "mobile-phone" },
  divider,
  { text: "搜索加入企业", icon: "search" },
  { text: "邀请码加入企业", icon: "id-number" },
  divider,
  { text: "服务社区", icon: "people" },
  divider,
  { text: "修改密码", icon: "key" },
  {
    text: "退出登录",
    icon: "log-out",
    onClick: handleLogout,
  },
]

export default function Profile(props) {
  return (
    <Popover
      content={createMenu(menu)}
      minimal={true}
      interactionKind={PopoverInteractionKind.HOVER}
      hoverCloseDelay={100}
      hoverOpenDelay={0}
      position={Position.BOTTOM_RIGHT}
    >
      <Avatar {...props} />
    </Popover>
  )
}

function handleLogout() {
  auth
    .logout()
    .then(goodbye)
    .then(gotoLoginPage)
}

function gotoLoginPage() {
  navigate("/auth", { replace: true })
}

function goodbye() {
  return toaster.show({ message: "退出成功，再见！" })
}
