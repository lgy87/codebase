import React from "react"
import * as r from "ramda"
import { Icon as BpIcon } from "@blueprintjs/core"
import { IconNames as allIconsNames } from "@blueprintjs/icons"

const iconNames = r.values(allIconsNames)
const cached = new Map()

function Icon({ icon, ...rest }) {
  if (cached.get(icon)) return cached.get(icon)

  const element = iconNames.includes(icon) ? (
    <BpIcon icon={icon} {...rest} />
  ) : (
    <span className={"iconfont icon-" + icon} {...rest} />
  )

  cached.set(icon, element)
  return element
}

export default React.memo(Icon)
