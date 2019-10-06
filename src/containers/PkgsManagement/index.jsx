import React, { useState } from "react"
import { Tag, Tabs, Tab, Menu, ContextMenu, Spinner } from "@blueprintjs/core"
import * as r from "ramda"
import * as ra from "ramda-adjunct"
import _ from "lodash/fp"

import useNodeInfo from "@/hooks/useNodeInfo"
import fromElectron from "@/utils/fromElectron"
import useNodeClientInfoOf from "@/hooks/useNodeClientInfoOf"
import toaster from "@/utils/toaster"
import Popconfirm from "@/components/Popconfirm"

import Setting, { STORAGE_KEY } from "./Settings"
import { sources, clients } from "./Settings/config"
import initializeSettingIfNeeded from "./initializeSetting"

const PkgManagement = () => {
  initializeSettingIfNeeded()

  const node = useNodeInfo()
  const [npm, whileRemovingNpm, removeNpmPkgs] = useNodeClientInfoOf("npm")
  const [yarn, whileRemovingYarn, removeYarnPkgs] = useNodeClientInfoOf("yarn")
  const [selectTabId, setSelectTabId] = useState("setting")

  const whileRemoving = r.or(whileRemovingNpm, whileRemovingYarn)

  return (
    <div style={panelStyle}>
      {isInstalled(node) && (
        <>
          {whileRemoving && (
            <div style={spinnerStyle}>
              <Spinner intent="primary" size={30} />
            </div>
          )}
          <Tabs selectedTabId={selectTabId} onChange={setSelectTabId}>
            {renderPackageInfo(npm, removeNpmPkgs)}
            {renderPackageInfo(yarn, removeYarnPkgs)}
            <Tab id="setting" title="Setting" panel={<Setting />} />
          </Tabs>
        </>
      )}
    </div>
  )
}

function renderPackageInfo(client, removePkgs) {
  if (hasPkgs(client)) {
    const { name } = client
    const capitalized = _.capitalize(client.name)

    return (
      <Tab
        id={name}
        title={capitalized}
        panel={renderPkgs(client, removePkgs)}
      />
    )
  }
}

function renderPkgs(client, removePkgs) {
  return client.pkgs.map(pkg => renderPkg(pkg, client, removePkgs))
}

function renderPkg(pkg, client, removePkgs) {
  const { root } = client

  return (
    <Tag
      key={pkg}
      style={tagStyle}
      round={true}
      large
      minimal
      interactive
      intent="primary"
      onContextMenu={renderContextMenu}
    >
      {pkg}
    </Tag>
  )

  function remove() {
    fromElectron
      .removeItem(`${root}/${pkg}`)
      .then(() => removePkgs(pkg))
      .then(() => toaster.success({ message: `删除[${pkg}]成功!` }))
  }

  function open() {
    fromElectron.openItem(`${root}/${pkg}`)
  }

  function renderContextMenu(e) {
    const menu = (
      <Menu>
        <Menu.Item icon="folder-close" onClick={open} text="Open" />
        <Menu.Item icon="delete" onClick={remove} text="Delete" />
        <Menu.Item icon="trending-up" text="Upgrade" />
      </Menu>
    )

    ContextMenu.show(menu, { left: e.clientX, top: e.clientY })
  }
}

const isInstalled = r.propSatisfies(ra.isTruthy, "installed")
const hasPkgs = r.pathSatisfies(r.lt(0), ["pkgs", "length"])

const panelStyle = {
  marginRight: "20px",
}
const tagStyle = {
  margin: "0 5px 10px 0",
}
const spinnerStyle = {
  position: "absolute",
  right: 20,
}

export default PkgManagement
