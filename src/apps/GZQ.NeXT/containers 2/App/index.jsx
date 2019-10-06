import React, { useState, useEffect } from "react"
import { hot } from "react-hot-loader/root"
import { Router } from "@reach/router"
import * as r from "ramda"
import * as ra from "ramda-adjunct"

import Header from "~/containers/Header"
import userOrgInfoStorage from "~/utils/userOrgInfoStorage"
import { navigate } from "~/utils/router"

const App = () => {
  const [userOrgInfo, setUserOrgInfo] = useState({})

  useEffect(() => {
    userOrgInfoStorage
      .getItem()
      .then(r.ifElse(ra.isNull, () => navigate("/auth"), setUserOrgInfo))
  }, [])

  return (
    <Router style={style}>
      <Header path="/" userOrgInfo={userOrgInfo} />
    </Router>
  )
}

export default hot(App)

const style = {
  height: "100%",
}
