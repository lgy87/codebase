import React, { FC, lazy, Suspense, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Route, Redirect, Switch } from "react-router-dom"
import { Spinner, Intent } from "@blueprintjs/core"
import * as ra from "ramda-adjunct"
import * as r from "ramda"

import {
  userStorage,
  orgsStorage,
  orgStorage,
} from "~/utils/userOrgInfoStorage"
import { name as GZQAppName } from "@/GZQ.NeXT/config"
import { isLoggedIntoGZQ } from "@/GZQ.NeXT/Auth/logic"

import {
  setLoggedIn,
  setLoggedOut,
  setOrg,
  setOrgs,
  setUser,
} from "@/GZQ.NeXT/actions"

import EmptyState from "../EmptyState"
import useConfig from "./useConfig"
import { setSidebar, setName, setTheme } from "./actions"

const GZQ = lazy(() => import("../GZQ.NeXT"))
const Pkgs = lazy(() => import("../PkgsManagement"))

const loading = <Spinner intent={Intent.PRIMARY} size={100} />

const AppRoot: FC<{}> = () => {
  const { name, theme, sidebar, initialized } = useConfig()
  const dispatch = useDispatch()

  useEffect(() => {
    ;(async () => {
      dispatch(setName(name))
      dispatch(setTheme(theme))
      dispatch(setSidebar(sidebar))
    })()
  }, [name, theme, sidebar])

  useEffect(() => {
    ;(async () => {
      try {
        const [user, orgs, org] = await Promise.all([
          userStorage.getItem(),
          orgsStorage.getItem(),
          orgStorage.getItem(),
        ])
        isLoggedIntoGZQ() ? dispatch(setLoggedIn()) : dispatch(setLoggedOut())

        if (r.isEmpty(user)) return

        dispatch(setUser(user))
        dispatch(setOrgs(orgs))
        dispatch(setOrg(org))
      } catch {}
    })()
  }, [])

  if (ra.isFalsy(initialized)) return <EmptyState />

  return (
    <Suspense fallback={loading}>
      <Switch>
        <Route path={`/${GZQAppName}`} component={GZQ} />
        <Route path="/Pkgs" component={Pkgs} />
        {name && <Redirect exact to={`/${name}`} />}
      </Switch>
    </Suspense>
  )
}

export default AppRoot
