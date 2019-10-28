import * as r from "ramda"
import * as ra from "ramda-adjunct"
import React from "react"
import { Link } from "react-router-dom"

import { RouteItem, RouteList, RouteConfigList } from "./types"

const CHILD_NODES = "childNodes"
const forEach = r.addIndex(r.forEach)

export default r.pipe<RouteConfigList, RouteList>(
  r.clone,
  r.tap(addIdRecursively),
  // @ts-ignore
  r.tap(adjustNodesPath),
  r.tap(updateLabelToLink),
)

// 递归添加 id (与各自的 index 相同)
function addIdRecursively(configs: RouteList): RouteList {
  forEach((config: unknown, index: number) => {
    ;(config as RouteItem).id = index

    const children = (config as RouteItem)[CHILD_NODES]
    if (ra.isArray(children)) {
      addIdRecursively(children)
    }
  }, configs)

  return configs
}

// 除第一级外，子级的 Node 的 path 拼上父级的 path
function adjustNodesPath(configs: RouteList, parentPath = ""): RouteList {
  forEach((config: unknown) => {
    const node = config as RouteItem
    node.path = `${parentPath}/${node.path}`

    const children = node[CHILD_NODES]
    if (ra.isArray(children)) {
      adjustNodesPath(children, node.path)
    }
  }, configs)

  return configs
}

function updateLabelToLink(configs: RouteList): RouteList {
  forEach((config: unknown) => {
    const node = config as RouteItem
    node.label = <Link to={node.path}>{node.label}</Link>
    const children = node[CHILD_NODES]

    if (ra.isArray(children)) {
      updateLabelToLink(children)
    }
  }, configs)

  return configs
}
