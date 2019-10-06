import { setConfig } from "react-hot-loader"
import React from "react"
import mode from "@bit/lgy87.utils.mode"
import { FocusStyleManager } from "@blueprintjs/core"

import "@blueprintjs/core/lib/css/blueprint.css"
import "~/vendors/reactSplitPane/style.css"

FocusStyleManager.onlyShowFocusOnTabs()

if (mode.isNotProd) {
  const whyDidYouRender = require("@welldone-software/why-did-you-render")
  whyDidYouRender(React, {
    include: [/pure/, /^ConnectFunction$/],
    logOnDifferentValues: true,
    collapseGroups: true,
  })
}

setConfig({
  ignoreSFC: true,
  pureRender: true,
})
