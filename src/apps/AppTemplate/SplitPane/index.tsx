import React, { memo, useCallback, FC, ReactNode } from "react"
import * as r from "ramda"
import ReactSplitPane from "react-split-pane"
import _ from "lodash"
import { useDispatch, useSelector } from "react-redux"

import useStorage from "~/hooks/useStorage"
import { Sidebar } from "~/types"
import { setSidebarWidth } from "@/Entry/actions"
import { SIDEBAR } from "@/Entry/useConfig"

import style from "../style.module.scss"

type SizeChangeHandler = (width: number) => void

type SplitPaneProps = {
  isSidebarLeft: boolean
  children: ReactNode
}

const SIDEBAR_MIN_WIDTH = 100
const SIDEBAR_WIDTH = 200
const SIDEBAR_MAX_WIDTH = 300

const SplitPane: FC<SplitPaneProps> = ({ isSidebarLeft, children }) => {
  const dispatch = useDispatch()
  const [, presistSidebarWidth] = useStorage(SIDEBAR)

  const sidebar = useSelector(r.pathOr({}, ["configs", "sidebar"])) as Sidebar
  const primary = isSidebarLeft ? "first" : "second"

  const handleSizeChange: SizeChangeHandler = useCallback(
    _.debounce<SizeChangeHandler>((width: number) => {
      dispatch(setSidebarWidth(width))
      // @ts-ignore
      presistSidebarWidth({ width })
    }, 1000),
    [],
  )

  return (
    <ReactSplitPane
      split="vertical"
      primary={primary}
      defaultSize={sidebar.width || SIDEBAR_WIDTH}
      minSize={sidebar.minWidth || SIDEBAR_MIN_WIDTH}
      maxSize={sidebar.maxWidth || SIDEBAR_MAX_WIDTH}
      className={style.splitPane}
      onChange={handleSizeChange}
    >
      {children}
    </ReactSplitPane>
  )
}

SplitPane.defaultProps = {
  isSidebarLeft: true,
}

export default memo(SplitPane)
