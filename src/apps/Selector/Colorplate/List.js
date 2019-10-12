import React, { memo, useCallback } from "react"
import * as r from "ramda"
import * as ra from "ramda-adjunct"
import cx from "classnames"
import { Colors } from "@blueprintjs/core"
import _ from "lodash"
import { useDispatch } from "react-redux"

import useTheme from "~/hooks/useTheme"
import useStorage from "~/hooks/useStorage"
import { setTheme } from "@/Entry/ducks"
import { THEME } from "~/types"

import config from "./config"
import Item from "./Item"

import style from "../style.module.scss"

const colors = r.pipe(
  r.map(r.toUpper),
  r.map(ra.concatRight("3")),
  r.map(color => ({ value: r.prop(color, Colors), name: r.init(color) })),
  r.reduce((accu, item) => ((accu[item.value] = item), accu), {}),
)(config)

function List(props) {
  const dispatch = useDispatch()
  const theme = useTheme()
  const [_, presistTheme] = useStorage(THEME)

  const className = cx(style.colorplate, props.className)

  const handleAppThemeChanged = useCallback(
    newTheme => {
      if (r.eqProps("value", newTheme, theme)) return

      dispatch(setTheme(newTheme))
      presistTheme(newTheme)
    },
    [dispatch],
  )
  const iterator = useCallback(
    color => (
      <Item
        key={color.value}
        color={color}
        setAppTheme={handleAppThemeChanged}
        active={color.value === theme.value}
      />
    ),
    [handleAppThemeChanged, theme],
  )

  return (
    <div className={className}>
      {r.pipe(
        r.values,
        r.map(iterator),
      )(colors)}
    </div>
  )
}

export default memo(List)
