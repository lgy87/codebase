import React, { FC, lazy, Suspense, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Route, Redirect, Switch } from "react-router-dom"
import { Spinner, Intent } from "@blueprintjs/core"

import { Sidebar, Theme, Name } from "~/types"
import { name as GZQAppName } from "@/GZQ.NeXT/config"
import { UserOrgs } from "@/GZQ.NeXT/Auth/logic/types"

import { setSidebar, setName, setTheme } from "./ducks"

type Props = {
  name: Name
  theme: Theme
  sidebar: Sidebar
  userOrgs: UserOrgs
}

const GZQ = lazy(() => import("../GZQ.NeXT"))
const Pkgs = lazy(() => import("../PkgsManagement"))

const loading = <Spinner intent={Intent.PRIMARY} size={100} />

const AppRoot: FC<Props> = ({ name, sidebar, theme, userOrgs }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    ;(async () => {
      dispatch(setName(name))
      dispatch(setTheme(theme))
      dispatch(setSidebar(sidebar))
    })()
  }, [])

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
