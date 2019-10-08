import React, { memo } from "react"
import { Alignment, Navbar, Colors } from "@blueprintjs/core"
import * as r from "ramda"
import { Flex, Box } from "reflexbox"

import Logo from "~/components/Image"
import { logo } from "./config"
import Profile from "./Profile"
import AppStore from "./AppStore"
import OrgList from "./OrgList"

const Header = props => {
  const { user = {}, orgs = [], org = {} } = props

  return (
    <>
      <Navbar.Group align={Alignment.LEFT}>
        <Logo src={logo} />
        <Flex pl={120} align="center" justify="center">
          <Box>
            <OrgList orgs={orgs} org={org} />
          </Box>
        </Flex>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <AppStore org={org.current} />
        <Navbar.Divider />
        <Profile {...user} />
      </Navbar.Group>
    </>
  )
}

export default memo(Header)
