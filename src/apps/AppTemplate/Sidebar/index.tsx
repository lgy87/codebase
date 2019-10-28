import React, { FC, useState, useCallback, memo } from "react"
import cx from "classnames"
import * as r from "ramda"
import { Tree, ITreeNode } from "@blueprintjs/core"

import style from "./style.module.scss"
import { RouteList } from "./types"

const className = cx(style.sidebar, "height100")
const createExpandedLens = r.pipe(
  r.intersperse("childNodes"),
  r.append("isExpanded"),
  r.lensPath,
)

type Props = {
  routers: RouteList
}

const Sidebar: FC<Props> = props => {
  const [routerConfig, setRouterConfig] = useState(props.routers)

  const handleNodeExpandAndCollapse = useCallback((indexPath, willExpand) => {
    const isExpandedLens = createExpandedLens(indexPath)
    setRouterConfig(r.set(isExpandedLens, willExpand))
  }, [])

  const handleNodeCollapse = useCallback(
    (_, indexPath) => handleNodeExpandAndCollapse(indexPath, false),
    [],
  )
  const handleNodeExpand = useCallback(
    (_, indexPath) => handleNodeExpandAndCollapse(indexPath, true),
    [],
  )

  return (
    <Tree
      contents={routerConfig as ITreeNode[]}
      className={className}
      onNodeCollapse={handleNodeCollapse}
      onNodeExpand={handleNodeExpand}
    />
  )
}

export default memo(Sidebar)
