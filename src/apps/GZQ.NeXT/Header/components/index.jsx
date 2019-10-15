import React, { memo } from "react"
import { Alignment, Navbar, Colors } from "@blueprintjs/core"
import * as r from "ramda"
import { Flex, Box } from "reflexbox"
import { useSelector } from "react-redux"

import Logo from "~/components/Image"
import { logo } from "./config"
import Profile from "./Profile"
import AppStore from "./AppStore"
import OrgList from "./OrgList"

const { Group } = Navbar

const Header = () => {
  const orgs = useSelector(r.path(["gzq", "orgs"]))
  const org = useSelector(r.path(["gzq", "org"]))

  return (
    <>
      <Group align={Alignment.LEFT}>
        <Logo src={logo} height="32" style={{ borderRadius: "50%" }} />
        <Flex ml={100} align="center" justify="center">
          <Box>
            <OrgList org={org} orgs={orgs} />
          </Box>
        </Flex>
      </Group>

      <Group align={Alignment.RIGHT}>
        <AppStore org={org.current} />
        <Navbar.Divider />
        <Profile />
      </Group>
    </>
  )
}

export default memo(Header)
