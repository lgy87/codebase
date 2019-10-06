import React, { memo } from "react"
import { Alignment, Navbar, Colors } from "@blueprintjs/core"
import * as r from "ramda"
import { Flex, Box } from "reflexbox"

import Logo from "~/components/Image"
import config from "./config"
import Profile from "./Profile"
import AppStore from "./AppStore"
import OrgList from "./OrgList"

const Header = props => {
  const { user = {}, orgs = [], org = {} } =
    r.propOr({}, "userOrgInfo", props) || {}

  return (
    <>
      <Navbar style={style}>
        <Navbar.Group align={Alignment.LEFT} style={style}>
          <Logo src={config.logo} />
          <Flex pl={120} align="center" justify="center">
            <Box>
              <OrgList orgs={orgs} org={org} />
            </Box>
          </Flex>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT} style={style}>
          <AppStore org={org.current} />
          <Navbar.Divider />
          <Profile {...user} />
        </Navbar.Group>
      </Navbar>
    </>
  )
}

export default r.pipe(memo)(Header)

const style = {
  height: "60px",
  backgroundColor: Colors.BLUE3,
}
