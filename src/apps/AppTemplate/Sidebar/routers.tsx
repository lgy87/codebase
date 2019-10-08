import * as r from "ramda"
import * as ra from "ramda-adjunct"
import React from "react"
import { Link } from "react-router-dom"
import configs from "./config"
import { RouteItem, RouteList } from "./types"

const CHILD_NODES = "childNodes"
const forEach = r.addIndex(r.forEach)

export default r.pipe(
  r.clone,
  r.tap(addIdRecursively),
  r.tap(adjustNodesPath),
  r.tap(updateLabelToLink),
)(configs) as RouteList

// 递归添加 id (与各自的 index 相同)
function addIdRecursively(configs: RouteList) {
  forEach((config: unknown, index: number) => {
    ;(config as RouteItem).id = index

    const children = (config as RouteItem)[CHILD_NODES]
    if (ra.isArray(children)) {
      addIdRecursively(children)
    }
  }, configs)
}

// 除第一级外，子级的 Node 的 path 拼上父级的 path
function adjustNodesPath(configs: RouteList, parentPath = "") {
  forEach((config: unknown) => {
    const node = config as RouteItem
    node.path = `${parentPath}/${node.path}`

    const children = node[CHILD_NODES]
    if (ra.isArray(children)) {
      adjustNodesPath(children, node.path)
    }
  }, configs)
}

function updateLabelToLink(configs: RouteList) {
  forEach((config: unknown) => {
    const node = config as RouteItem
    node.label = <Link to={node.path}>{node.label}</Link>
    const children = node[CHILD_NODES]

    if (ra.isArray(children)) {
      updateLabelToLink(children)
    }
  }, configs)
}
