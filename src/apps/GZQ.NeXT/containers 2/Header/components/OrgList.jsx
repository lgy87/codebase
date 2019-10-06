import * as r from "ramda"
import * as ra from "ramda-adjunct"
import React, { memo } from "react"
import { Menu, Position } from "@blueprintjs/core"
import { Select } from "@blueprintjs/select"
import createMenu from "./createMenu"
import ImageWithText from "~/components/ImageWithText"

const OrgList = props => {
  const { org = {}, orgs = [] } = props
  const { defaults, current = defaults } = org

  const currentOrg = r.pipe(
    r.find(r.propEq("id", current)),
    r.defaultTo({}),
  )(orgs)

  const me = createMenu(
    polyfillLogoForOrgs(orgs.concat(orgs, orgs)),
    createItem,
  )

  return (
    <Select
      items={polyfillLogoForOrgs(orgs.concat(orgs, orgs))}
      filterable={orgs.length > 8}
      popoverProps={popoverProps}
      //scrollToActiveItem
      //itemRenderer={createItem}
      itemListRenderer={() => me}
    >
      <ImageWithText
        src={currentOrg.logo}
        text={currentOrg.name}
        textStyle={textStyle}
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
  height: "200px",
}

function createItem(item, index) {
  return (
    <Menu.Item
      key={index}
      text={<ImageWithText src={item.logo} text={item.name} />}
    />
  )
}

const defaultOrgLogo =
  "http://gzq.static.chanjet.com/static/images/ent_logo_android.png"

const logoMissing = r.pipe(
  r.prop("logo"),
  ra.isFalsy,
)
const polyfillLogoForOrg = r.when(
  logoMissing,
  r.mergeLeft({ logo: defaultOrgLogo }),
)

const polyfillLogoForOrgs = r.map(polyfillLogoForOrg)
