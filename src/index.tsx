import React from "react"
import ReactDOM from "react-dom"

import * as serviceWorker from "./serviceWorker"
import Entry from "./apps/Entry"
import "./init"

ReactDOM.render(<Entry />, document.getElementById("root"))

serviceWorker.unregister()
