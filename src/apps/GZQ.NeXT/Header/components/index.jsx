import React, { memo } from "react"
import { Alignment, Navbar, Colors } from "@blueprintjs/core"
import * as r from "ramda"
import { Flex, Box } from "reflexbox"

import Logo from "~/components/Image"
import { logo } from "./config"
import Profile from "./Profile"
import AppStore from "./AppStore"
import OrgList from "./OrgList"

const { Group } = Navbar

const Header = () => {
  return (
    <>
      <Group align={Alignment.LEFT}>
        <Logo src={logo} height="32" style={{ borderRadius: "50%" }} />
        <Flex ml={100} align="center" justify="center">
          <Box>
            <OrgList />
          </Box>
        </Flex>
      </Group>

      <Group align={Alignment.RIGHT}>
        <AppStore />
        <Navbar.Divider />
        <Profile />
      </Group>
    </>
  )
}

export default memo(Header)
