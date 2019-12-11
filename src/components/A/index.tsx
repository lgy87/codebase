import React, { FC, AnchorHTMLAttributes, memo } from "react"
import * as ra from "ramda-adjunct"

export const TARGET_BLANK = "_blank"
export const SECURITY_REL = "noopener noreferrer"

type MaybeEmptyString = string | undefined
type Rel = MaybeEmptyString
type Target = MaybeEmptyString

const A: FC<AnchorHTMLAttributes<{}>> = ({ rel, ...restProps }) => {
  const props = {
    ...restProps,
    rel: makeSecurityRel(rel, restProps.target),
  }
  return <a {...props} />
}

export default memo(A)

function makeSecurityRel(rel: Rel, target: Target) {
  if (isBlank(target)) return rel
  if (isBlank(rel)) return SECURITY_REL

  return `${rel} ${SECURITY_REL}`
}

const isBlank = ra.isFalsy
