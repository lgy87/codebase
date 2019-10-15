import React, { memo, FC } from "react"
import { Popover, Position, PopoverInteractionKind } from "@blueprintjs/core"
import { useHistory } from "react-router"
import { useSelector } from "react-redux"
import * as r from "ramda"

import Avatar from "~/components/Avatar"
import toaster from "~/utils/toaster"
import {
  userStorage,
  orgsStorage,
  orgStorage,
} from "~/utils/userOrgInfoStorage"
import { name as GZQAppName } from "@/GZQ.NeXT/config"
import auth from "@/GZQ.NeXT/Auth/logic"

import createMenu, { divider } from "./createMenu"

const Profile: FC<any> = () => {
  const user = useSelector(r.path(["gzq", "user"]))
  const history = useHistory()

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

  return (
    <Popover
      content={createMenu(menu)}
      minimal={true}
      interactionKind={PopoverInteractionKind.HOVER}
      hoverCloseDelay={100}
      hoverOpenDelay={0}
      position={Position.BOTTOM_RIGHT}
    >
      <Avatar {...user} />
    </Popover>
  )

  function gotoLoginPage() {
    history.replace(`/${GZQAppName}/login`)
  }

  function handleLogout() {
    auth
      .logout()
      .then(goodbye)
      .then(gotoLoginPage)
  }

  function goodbye() {
    return toaster.show({ message: "退出成功，再见！" })
  }
}

export default memo(Profile)
