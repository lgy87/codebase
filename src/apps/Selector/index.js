import React, { memo, useState, useRef, useCallback } from "react"
import { useSpring, animated } from "react-spring"
import {
  Popover,
  Button,
  Position,
  Classes,
  PopoverInteractionKind,
} from "@blueprintjs/core"
import { useClickAway } from "react-use"

import Menu from "./Menu"
import Colorplate from "./Colorplate"
import style from "./style.module.scss"

const from = {
  opacity: 0.3,
}

const to = {
  opacity: 1,
  boxShadow: "0 0 20px -5px rgba(0, 0, 0, .5)",
}

const content = (
  <>
    <Colorplate className={Classes.POPOVER_DISMISS} />
    <Menu />
  </>
)

function Selector() {
  const [mouseEnter, setMouseEnter] = useState(false)
  const ref = useRef(null)

  const props = useSpring({
    from,
    to: mouseEnter ? to : from,
  })

  const enter = useCallback(() => setMouseEnter(true), [])
  const leave = useCallback(() => setMouseEnter(false), [])
  useClickAway(ref, () => mouseEnter && leave())

  return (
    <animated.div
      ref={ref}
      className={style.selector}
      style={props}
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      <Popover
        position={Position.BOTTOM_RIGHT}
        interactionKind={PopoverInteractionKind.HOVER}
        content={content}
        minimal
      >
        <Button icon="new-grid-item" />
      </Popover>
    </animated.div>
  )
}

export default memo(Selector)
