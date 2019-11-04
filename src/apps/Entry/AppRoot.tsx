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
import { Name, Theme, Sidebar } from "~/types"
import { name as GZQAppName } from "@/GZQ.NeXT/config"
import { isLoggedIntoGZQ } from "@/GZQ.NeXT/Auth/logic"
import {
  setLoggedIn,
  setLoggedOut,
  setOrg,
  setOrgs,
  setUser,
} from "@/GZQ.NeXT/actions"
import useUserOrgs from "@/GZQ.NeXT/hooks/useUserOrgs"

import EmptyState from "../EmptyState"
import useConfig from "./useConfig"
import { setSidebar, setName, setTheme } from "./actions"

const GZQ = lazy(() => import("../GZQ.NeXT"))
const Pkgs = lazy(() => import("../PkgsManagement"))

const loading = <Spinner intent={Intent.PRIMARY} size={100} />

const AppRoot: FC<{}> = () => {
  const { name, theme, sidebar, initialized } = useConfig()
  useUpdateConfigState(name, theme, sidebar)
  useUpdateGZQInfo()

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

function useUpdateConfigState(name: Name, theme: Theme, sidebar: Sidebar) {
  const dispatch = useDispatch()

  useEffect(() => {
    ;(async () => {
      dispatch(setName(name))
      dispatch(setTheme(theme))
      dispatch(setSidebar(sidebar))
    })()
  }, [name, theme, dispatch, sidebar])
}

function useUpdateGZQInfo() {
  const dispatch = useDispatch()
  const { user, orgs, org } = useUserOrgs()

  useEffect(() => {
    isLoggedIntoGZQ() ? dispatch(setLoggedIn()) : dispatch(setLoggedOut())

    if (r.anyPass([ra.isFalsy, r.isEmpty])(user)) return

    dispatch(setUser(user))
    dispatch(setOrgs(orgs))
    dispatch(setOrg(org))
  }, [user, orgs, dispatch, org])
}
