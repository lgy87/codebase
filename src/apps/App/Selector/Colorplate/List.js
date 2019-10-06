import React, { memo, useCallback } from "react"
import * as r from "ramda"
import * as ra from "ramda-adjunct"
import cx from "classnames"
import { Colors } from "@blueprintjs/core"
import _ from "lodash/fp"

import { useDispatch } from "react-redux"
import useTheme from "~/hooks/useTheme"
import useStorage from "~/hooks/useStorage"

import config from "./config"
import Item from "./Item"

import { setTheme } from "~/apps/App/ducks"
import { THEME } from "~/apps/App/config"
import style from "../style.module.scss"

// const colors = r.pipe(
//   x => (console.log(x), x),
//   r.tap(console.log),
//   r.map(r.toUpper),
//   r.tap(console.log),
//   r.map(ra.concatRight("3")),
//   r.tap(console.log),
//   r.map(color => ({ value: r.prop(color, Colors), name: r.init(color) })),
//   _.keyBy("value"),
// )(config)

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
      )([] /*colors*/)}
    </div>
  )
}

export default memo(List)
