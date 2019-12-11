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

import { MenuItem } from "@blueprintjs/core"
import { Select } from "@blueprintjs/select"

const loginURL = `/${name}/login`

export default function Index() {
  const currentOrgID = useSelector(r.path(["gzq", "org", "current"]))

  return (
    <Switch>
      <Route path={loginURL} component={Auth} />
      {isLoggedIntoGZQ() ? (
        <>
          <Route path={`/${name}/:id`} component={GZQ} />
          <Redirect to={`/${name}/${currentOrgID}`} />
        </>
      ) : (
        <Redirect to={loginURL} />
      )}
    </Switch>
  )
}

function GZQ() {
  type X = {
    name: string
    id: string
    age: number
  }
  const xs: Array<X> = [
    { name: "lgy", id: "1", age: 32 },
    { name: "oooo", id: "2", age: 32 },
  ]

  const XSelect = Select.ofType<X>()

  return (
    <AppTemplate>
      <Header />
      <Sidebar />
      <div>content</div>
      <h1>loading.....</h1>
    </AppTemplate>
  )
}
