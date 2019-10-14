import React, { memo, useCallback } from "react"
import * as r from "ramda"
import { Menu as BPMenu } from "@blueprintjs/core"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"

import useStorage from "~/hooks/useStorage"
import { apps } from "~/configs"

import { setName } from "../Entry/actions"
import { NAME } from "../Entry/useConfig"

function Menu() {
  const dispatch = useDispatch()
  const name = useSelector(r.path(["configs", "name"]))
  const [, presistName] = useStorage(NAME)
  const history = useHistory()

  const handleAppChanged = useCallback(
    app => {
      const newName = app.name
      if (r.equals(newName, name)) return

      dispatch(setName(newName))
      presistName(newName)
      history.replace(`/${app.path}`)
    },
    [dispatch, name, presistName],
  )

  return (
    <BPMenu>
      {apps.map(app => (
        <BPMenu.Item
          key={app.name}
          text={app.text}
          onClick={() => handleAppChanged(app)}
        />
      ))}
    </BPMenu>
  )
}

export default memo(Menu)
