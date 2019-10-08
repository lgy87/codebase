import React, { useEffect, useState } from "react"
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom"
import { usePromise } from "react-use"

import userOrgInfoStorage from "~/utils/userOrgInfoStorage"

import { isLoggedIntoGZQ } from "./Auth/logic"

import AppTemplate from "../AppTemplate"
import Header from "./Header"
import Auth from "./Auth"

import { UserOrgs } from "./Auth/logic/types"

export default ({ match }: any) => {
  const loginURL = `${match.path}/login`

  return (
    <Switch>
      <Route path={loginURL} component={Auth} />
      {isLoggedIntoGZQ() || <Redirect to={loginURL} />}
      <Route exact path={match.path} component={GZQApp} />
    </Switch>
  )
}

function GZQApp(props: any) {
  const mounted = usePromise()
  const [userOrg, setUserOrg] = useState<UserOrgs>({} as UserOrgs)

  useEffect(() => {
    ;(async () => {
      const cached = await mounted<UserOrgs>(userOrgInfoStorage.getItem())
      setUserOrg(cached)
    })()
  }, [])

  return (
    <AppTemplate>
      <Header {...userOrg} />
      <ul>
        <li>sidebar</li>
      </ul>
      <div>content</div>
      <h1>loading.....</h1>
    </AppTemplate>
  )
}
