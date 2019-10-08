import React from "react"

import { Navbar, Alignment } from "@blueprintjs/core"

import AppTemplate from "../AppTemplate"
import Header from "./Header"

export default () => {
  return (
    <AppTemplate>
      <Header />
      <ul>
        <li>sidebar</li>
      </ul>
      <div>content</div>
      <h1>loading.....</h1>
    </AppTemplate>
  )
}
