import React, { memo, FC } from "react"
import cx from "classnames"

import { Theme } from "~/types"
import style from "../style.module.scss"

export type Props = {
  color: Theme
  active: boolean
  setAppTheme: (theme: Theme) => void
}
const Item: FC<Props> = ({ color, setAppTheme, active }) => {
  const bg = color.value

  const itemStyle = {
    backgroundColor: bg,
    border: `2px solid ${bg}`,
  }

  const className = cx(style.colorItem, { [style.active]: active })
  const setTheme = () => setAppTheme(color)

  return (
    <span className={className} onClick={setTheme} style={itemStyle}>
      color
    </span>
  )
}

export default memo(Item)
