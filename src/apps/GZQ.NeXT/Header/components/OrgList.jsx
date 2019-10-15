import * as r from "ramda"
import * as ra from "ramda-adjunct"
import React, { memo } from "react"
import {
  Menu,
  Position,
  Button,
  PopoverInteractionKind,
} from "@blueprintjs/core"
import { Select } from "@blueprintjs/select"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"

import ImageWithText from "~/components/ImageWithText"
import { ThemedButton } from "~/components/Button"
import { setCurrentOrg } from "@/GZQ.NeXT/actions"
import { name } from "@/GZQ.NeXT/config"

import { defaultOrgLogo } from "./config"
import createMenu from "./createMenu"

const OrgList = ({ org, orgs }) => {
  const { defaults, current = defaults } = org
  const history = useHistory()
  const dispatch = useDispatch()

  const currentOrg = r.pipe(
    r.find(r.propEq("id", current)),
    r.defaultTo({}),
  )(orgs)

  const itemRenderer = createMenu(polyfillLogoForOrgs(orgs), createItem)

  function createItem({ logo, name, id }) {
    return (
      <Menu.Item
        key={id}
        onClick={() => {
          dispatch(setCurrentOrg(id))
          history.push(`/${name}/${id}`)
        }}
        text={<ImageWithText src={logo} text={name} />}
      />
    )
  }

  return (
    <Select
      items={polyfillLogoForOrgs(orgs.concat(orgs, orgs))}
      filterable={orgs.length >= 8}
      popoverProps={popoverProps}
      // scrollToActiveItem
      itemRenderer={createItem}
      itemListRenderer={() => itemRenderer}
      // onItemSelect={itemSelect}
    >
      <ThemedButton
        intent="primary"
        icon="briefcase"
        rightIcon="chevron-down"
        text={"当前企业：" + currentOrg.name}
      />
    </Select>
  )
}

export default memo(OrgList)

const textStyle = {
  color: "white",
}
const popoverProps = {
  minimal: true,
  position: Position.TOP,
  position: Position.BOTTOM_LEFT,
  interactionKind: PopoverInteractionKind.HOVER,
}

const logoMissing = r.pipe(
  r.prop("logo"),
  ra.isFalsy,
)
const polyfillLogoForOrg = r.when(
  logoMissing,
  r.mergeLeft({ logo: defaultOrgLogo }),
)

const polyfillLogoForOrgs = r.map(polyfillLogoForOrg)
