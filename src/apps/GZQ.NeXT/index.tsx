import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"

import { useSelector } from "react-redux"
import * as r from "ramda"
import AppTemplate from "@/AppTemplate"

import { isLoggedIntoGZQ } from "./Auth/logic"
import { name } from "./config"
import Header from "./Header"
import Auth from "./Auth"
import Sidebar from "./Sidebar"

const loginURL = `/${name}/login`

export default () => {
  const currentOrg = useSelector(r.path(["gzq", "org", "current"]))

  return (
    <Switch>
      <Route path={loginURL} component={Auth} />
      {isLoggedIntoGZQ() ? (
        <>
          <Route path={`/${name}/:id`} component={GZQ} />
          <Redirect to={`/${name}/${currentOrg}`} />
        </>
      ) : (
        <Redirect to={loginURL} />
      )}
    </Switch>
  )
}

function GZQ(props: any) {
  return (
    <AppTemplate>
      <Header />
      <Sidebar />
      <div>content --- </div>
      <h1>loading.....</h1>
    </AppTemplate>
  )
}
