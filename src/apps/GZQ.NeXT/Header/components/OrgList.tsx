import * as r from "ramda"
import * as ra from "ramda-adjunct"
import React, { FC, memo, useMemo, useCallback } from "react"
import { Menu, Position, IButtonProps } from "@blueprintjs/core"
import { Select, ItemPredicate, ItemRenderer } from "@blueprintjs/select"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import ImageWithText from "~/components/ImageWithText"
import { ThemedButton } from "~/components/Button"
import { orgStorage } from "~/utils/userOrgInfoStorage"
import useTheme from "~/hooks/useTheme"
import { setCurrentOrg } from "@/GZQ.NeXT/actions"
import { name as appName } from "@/GZQ.NeXT/config"
import {
  Org,
  Orgs,
  OrgItem,
  OrgList as OrgListType,
} from "@/GZQ.NeXT/Auth/types"

import { defaultOrgLogo } from "./config"
// import createMenu from "./createMenu"
import style from "./style.module.scss"

const imageStyle = { width: 24 }
const OrgSelect = Select.ofType<OrgItem>()

const OrgList: FC<{}> = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const theme = useTheme()

  const org = useSelector(r.path(["gzq", "org"])) as Org
  const orgs = useSelector(r.path(["gzq", "orgs"])) as Orgs
  const { defaults, current: currentOrgID = defaults } = org

  type Orgs2OrgList = (orgs: Orgs) => OrgListType
  const getOrgItems: Orgs2OrgList = useCallback(
    r.pipe(r.values, polyfillLogoForOrgs),
    [],
  )

  const orgsWithLogo = useMemo(() => getOrgItems(orgs), [getOrgItems, orgs])

  const renderItem: ItemRenderer<OrgItem> = (
    { logo, name, id },
    { handleClick, modifiers, query },
  ) => {
    if (!modifiers.matchesPredicate) return null

    return (
      <Menu.Item
        key={id}
        // style={{ height: 32 }}
        onClick={handleClick}
        active={modifiers.active}
        // text={
        //   <ImageWithText
        //     src={logo}
        text={highlightText(name, query)}
        //     imageStyle={imageStyle}
        //   />
        // }
      />
    )
  }

  const renderItem2: ItemRenderer<OrgItem> = (
    { logo, name, id },
    { handleClick, modifiers, query },
  ) => {
    if (!modifiers.matchesPredicate) return null

    return (
      <Menu.Item
        key={id}
        onClick={handleClick}
        // text={
        //   <ImageWithText
        //     src={logo}
        text={highlightText(name, query)}
        //     imageStyle={imageStyle}
        //   />
        // }
      />
    )
  }

  const handleItemClick = async ({ id }: OrgItem) => {
    dispatch(setCurrentOrg(id))

    const dirtyOrg = await orgStorage.getItem()
    const newOrg = { ...dirtyOrg, current: id }

    orgStorage.setItem(newOrg)
    history.push(`/${appName}/${id}`)
  }

  const config: IButtonProps = {
    intent: "primary",
    icon: "briefcase",
    text: "当前企业：" + r.path([currentOrgID, "name"], orgs),
  }

  if (onlyOne(orgs)) return <ThemedButton {...config} />

  return (
    <OrgSelect
      items={orgsWithLogo}
      popoverProps={popoverProps}
      scrollToActiveItem
      itemRenderer={renderItem2}
      itemPredicate={filterItem}
      onItemSelect={handleItemClick}
      resetOnClose
    >
      <ThemedButton {...config} rightIcon="chevron-down" />
    </OrgSelect>
  )
}

export default memo(OrgList)

const filterItem: ItemPredicate<OrgItem> = (query, item) => {
  return item.name.includes(query)
}

const popoverProps = {
  minimal: true,
  position: Position.BOTTOM_LEFT,
}

type LogoMissing = (org: OrgItem) => boolean
const logoMissing: LogoMissing = r.pipe(r.prop("logo"), ra.isFalsy)

const polyfillLogoForOrg = r.when<OrgItem, OrgItem>(
  logoMissing,
  r.mergeLeft({ logo: defaultOrgLogo }),
)
const polyfillLogoForOrgs = r.map(polyfillLogoForOrg)

type OnlyOne = (orgs: Orgs) => boolean
const onlyOne: OnlyOne = r.pipe(r.values, ra.lengthEq(1))

function escapeRegExpChars(text: string) {
  return text.replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1")
}

const lengthGt0 = ra.lengthGt(0)
const lengthEq0 = ra.lengthEq(0)

function highlightText(text: string, query: string) {
  let lastIndex = 0
  const words = query
    .split(/\s+/)
    .filter(lengthGt0)
    .map(escapeRegExpChars)

  if (lengthEq0(words)) return [text]

  const regexp = new RegExp(words.join("|"), "gi")
  const tokens: Array<React.ReactNode> = []
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const match = regexp.exec(text)
    if (!match) break

    const length = match[0].length
    const before = text.slice(lastIndex, regexp.lastIndex - length)

    if (lengthGt0(before)) tokens.push(before)

    lastIndex = regexp.lastIndex
    tokens.push(
      <strong key={lastIndex} className={style.query}>
        {match[0]}
      </strong>,
    )
  }
  const rest = text.slice(lastIndex)
  if (lengthGt0(rest)) tokens.push(rest)
  return tokens
}
