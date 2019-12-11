import React, { memo } from "react"
import { Alignment, Navbar } from "@blueprintjs/core"
import * as r from "ramda"
import * as ra from "ramda-adjunct"
import { Flex, Box } from "reflexbox"
import { useSelector } from "react-redux"

import Logo from "~/components/Image"
import { defaultOrgLogo } from "./config"
import Profile from "./Profile"
import AppStore from "./AppStore"
import OrgList2 from "./OrgList"

const { Group } = Navbar

const Header = () => {
  const { defaults, current = defaults } = useSelector(r.path(["gzq", "org"]))
  const orgs = useSelector(r.path(["gzq", "orgs"]))
  const logoInPreferences = orgs[current].logo

  const logo = r.when(ra.isFalsy, r.always(defaultOrgLogo))(logoInPreferences)

  return (
    <>
      <Group align={Alignment.LEFT}>
        <Logo src={logo} height="32" style={{ borderRadius: "50%" }} />
        <Flex ml={100} align="center" justify="center">
          <Box>
            <OrgList2 />
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
