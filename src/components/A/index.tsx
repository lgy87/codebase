import React from "react"
import * as ra from "ramda-adjunct"

export const TARGET_BLANK = "_blank"
export const SECURITY_REL = "noopener noreferrer"

type Rel = string | undefined
type Target = string | undefined

const A: React.FC<React.AnchorHTMLAttributes<{}>> = ({ rel, ...restProps }) => {
  const newRel = makeSecurityRel(rel, restProps.target)

  return <a {...restProps} rel={newRel} />
}

export default A

function makeSecurityRel(rel: Rel, target: Target) {
  const newRel = ra.isFalsy(rel) ? "" : `${rel} `

  if (isNotBlank(target)) return newRel

  return `${newRel}${SECURITY_REL}`
}

function isNotBlank(target: Target) {
  return target !== TARGET_BLANK
}
