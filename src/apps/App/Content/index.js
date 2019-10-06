import React from "react"
import { Route } from "react-router"

// import CacheRoute from "react-router-cache-route"

import Overview from "~/apps/Overview"
import DeviceInfo from "~/apps/DeviceInfo"
import Settings from "~/apps/Settings"

export default function Main() {
  return (
    <>
      {/*<CacheRoute exact path="/info/cpu" component={Overview} />
        <CacheRoute exact path="/info/battery" component={DeviceInfo} />*/}
      <Route path="/info/cpu" component={Overview} />
      <Route path="/info/battery" component={DeviceInfo} />
      {/*<CacheRoute path="/settings" component={Settings} className="height100" />*/}
    </>
  )
}
