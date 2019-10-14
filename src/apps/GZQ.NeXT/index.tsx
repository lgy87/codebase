import React, { useEffect, useState } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { usePromise } from "react-use"
import { useSelector } from "react-redux"

import userOrgInfoStorage from "~/utils/userOrgInfoStorage"
import { name } from "./config"

import { isLoggedIntoGZQ } from "./Auth/logic"

import AppTemplate from "@/AppTemplate"
import Header from "./Header"
import Auth from "./Auth"
import { UserOrgs } from "./Auth/logic/types"

export default ({ match }: any) => {
  const loginURL = `${match.path}/login`
  const currentOrg = "90006539052"

  return (
    <Switch>
      <Route path={loginURL} component={Auth} />
      {isLoggedIntoGZQ() ? (
        <>
          <Route path={`/${name}/:id`} component={GZQApp} />
          <Redirect to={`/${name}/${currentOrg}`} />
        </>
      ) : (
        <Redirect to={loginURL} />
      )}
    </Switch>
  )
}

function GZQApp(props: any) {
  const mounted = usePromise()
  const [userOrg, setUserOrg] = useState({} as UserOrgs)

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
        <li>sidebar...</li>
      </ul>
      <div>content --- </div>
      <h1>loading.....</h1>
    </AppTemplate>
  )
}
