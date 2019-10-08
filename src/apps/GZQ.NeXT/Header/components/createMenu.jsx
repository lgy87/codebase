import React from "react"
import { Menu } from "@blueprintjs/core"
import * as r from "ramda"

const DIVIDER = Symbol("DIVIDER")
const isDivider = r.propEq("type", DIVIDER)
export const divider = { type: DIVIDER }

export default function createMenu(menu = [], menuItemCreator) {
  const createItem = r.defaultTo(createMenuItem, menuItemCreator)
  return <Menu style={{ overflow: "auto" }}>{menu.map(createItem)}</Menu>
}

function createMenuItem(item, index) {
  const Component = r.ifElse(
    isDivider,
    r.always(Menu.Divider),
    r.always(Menu.Item),
  )(item)

  return <Component {...item} key={index} />
}