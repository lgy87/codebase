import React, { useEffect, useState } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { usePromise } from "react-use"
import { useSelector, useDispatch } from "react-redux"
import * as r from "ramda"

import userOrgInfoStorage from "~/utils/userOrgInfoStorage"
import AppTemplate from "@/AppTemplate"

import { isLoggedIntoGZQ } from "./Auth/logic"
import { name } from "./config"
import Header from "./Header"
import Auth from "./Auth"

import { setLoggedIn, setLoggedOut, setOrg, setOrgs, setUser } from "./actions"

const loginURL = `/${name}/login`

export default () => {
  const dispatch = useDispatch()
  const isLogged = useSelector(r.path(["gzq", "logged"]))
  const currentOrg = useSelector(r.path(["gzq", "org", "current"]))

  // useEffect(() => {
  //   ;(async () => {
  //     try {
  //       const cached = await userOrgInfoStorage.getItem()
  //       isLoggedIntoGZQ() ? dispatch(setLoggedIn()) : dispatch(setLoggedOut())

  //       dispatch(setUser(cached.user))
  //       dispatch(setOrgs(cached.orgs))
  //       dispatch(setOrg(cached.org))
  //     } catch {}
  //   })()
  // }, [])

  return (
    <Switch>
      <Route path={loginURL} component={Auth} />
      {isLogged ? (
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

  return (
    <AppTemplate>
      <Header />
      <ul>
        <li>sidebar...</li>
      </ul>
      <div>content --- </div>
      <h1>loading.....</h1>
    </AppTemplate>
  )
}
