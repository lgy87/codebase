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

import ImageWithText from "~/components/ImageWithText"
import { ThemedButton } from "~/components/Button"

import { defaultOrgLogo } from "./config"
import createMenu from "./createMenu"

const OrgList = props => {
  const { org = {}, orgs = [] } = props
  const { defaults, current = defaults } = org

  const currentOrg = r.pipe(
    r.find(r.propEq("id", current)),
    r.defaultTo({}),
  )(orgs)

  const me = createMenu(polyfillLogoForOrgs(orgs), createItem)

  return (
    <Select
      items={polyfillLogoForOrgs(orgs.concat(orgs, orgs))}
      filterable={orgs.length >= 8}
      popoverProps={popoverProps}
      //scrollToActiveItem
      //itemRenderer={createItem}
      itemListRenderer={() => me}
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

export default r.pipe(memo)(OrgList)

const textStyle = {
  color: "white",
}
const popoverProps = {
  minimal: true,
  position: Position.TOP,
  position: Position.BOTTOM_LEFT,
  interactionKind: PopoverInteractionKind.HOVER,
}

function createItem(item, index) {
  return (
    <Menu.Item
      key={index}
      text={<ImageWithText src={item.logo} text={item.name} />}
    />
  )
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
