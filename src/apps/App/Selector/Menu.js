import React, { memo, useCallback } from "react"
import * as r from "ramda"
import { Menu as BPMenu } from "@blueprintjs/core"

import { setName } from "~/apps/App/ducks"
import { NAME } from "~/apps/App/config"
import { useSelector, useDispatch } from "react-redux"
import useStorage from "~/hooks/useStorage"

const GZQ_NeXT = "GZQ.NeXT"
const NODE_PKGS_MANAGEMENT = "Node Pkgs Management"

function Menu() {
  const dispatch = useDispatch()
  const name = useSelector(r.path(["configs", "name"]))
  const [, presistName] = useStorage(NAME)

  const handleAppNameChanged = useCallback(
    newName => {
      if (r.equals(newName, name)) return

      dispatch(setName(newName))
      presistName(newName)
    },
    [dispatch, name, presistName],
  )
  const setAppNameGZQ = useCallback(() => handleAppNameChanged(GZQ_NeXT), [
    handleAppNameChanged,
  ])
  const setAppNameNodePkgsManagement = useCallback(
    () => handleAppNameChanged(NODE_PKGS_MANAGEMENT),
    [handleAppNameChanged],
  )

  return (
    <BPMenu>
      <BPMenu.Item onClick={setAppNameGZQ} text="GZQ.NeXT" />
      <BPMenu.Item
        onClick={setAppNameNodePkgsManagement}
        text="Node Pkgs Management"
      />
    </BPMenu>
  )
}

export default memo(Menu)
