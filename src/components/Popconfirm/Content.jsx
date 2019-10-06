import * as r from "ramda"
import * as ra from "ramda-adjunct"
import React, { memo } from "react"
import { Button, Classes, Intent, H5, Popover } from "@blueprintjs/core"

// import mapPropTypes_ from "@/utils/mapPropTypes_"

function Component(props) {
  return (
    <div style={style}>
      <H5>{props.title}</H5>
      <div>
        <Button
          className={Classes.POPOVER_DISMISS}
          style={buttonStyle}
          onClick={props.onCancel || ra.noop}
        >
          {props.cancelButtonText}
        </Button>
        <Button
          className={Classes.POPOVER_DISMISS}
          intent={Intent.DANGER}
          onClick={props.onConfirm || ra.noop}
        >
          {props.confirmButtonText}
        </Button>
      </div>
    </div>
  )
}

const style = { padding: "10px 15px" }
const buttonStyle = { marginRight: "10px" }

Component.propTypes = {
  title: "string.",
  cancelButtonText: "string.",
  confirmButtonText: "string.",
  onCancel: "func",
  onConfirm: "func.",
}

export default memo(Component)
