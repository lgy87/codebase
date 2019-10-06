import React from "react"
import { Text, Classes } from "@blueprintjs/core"
import * as r from "ramda"

import useUsername from "@/hooks/useUsername"
import useNodeInfo from "@/hooks/useNodeInfo"
import useNodeClientInfoOf from "../../hooks/useNodeClientInfoOf"

const Overview = () => {
  return (
    <Text className={Classes.RUNNING_TEXT}>
      <User />
      <br />
      <Node />
      <br />
      <PackageInfo name="npm" />
      <br />
      <PackageInfo name="yarn" />
    </Text>
  )
}

function User() {
  const username = useUsername()
  return <Item name="User" value={username} />
}

function Node() {
  const node = useNodeInfo()
  return isInstalled(node) && <NodeInfo {...node} />
}

function NodeInfo(props) {
  return (
    <>
      <Item name="Node Path" value={props.path} />
      <Item name="Node Version" value={props.version} />
    </>
  )
}

function PackageInfo({ name = "npm" }) {
  const [info] = useNodeClientInfoOf(name)

  return (
    <>
      <Item name={name + " Path"} value={info.path} />
      <Item name={name + " Version"} value={info.version} />
      <Item name={name + " Root"} value={info.root} />
    </>
  )
}

function Item(props) {
  return (
    <Text>
      <span style={nameStyle}>{props.name}</span>:
      <Value value={props.value} />
    </Text>
  )
}

function Value(props) {
  return (
    <b className={Classes.TEXT_DISABLED} style={style}>
      {props.value}
    </b>
  )
}

const isInstalled = r.propEq("installed", true)

const style = {
  paddingLeft: "10px",
  userSelect: "text",
}
const nameStyle = {
  display: "inline-block",
  width: "100px",
  textAlign: "right",
}

export default Overview
