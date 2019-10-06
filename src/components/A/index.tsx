import React from "react"

export const TARGET_VALUE_BLANK = "_blank"
export const SECURITY_REL = "noopener noreferrer"

const A: React.FC<React.AnchorHTMLAttributes<{}>> = ({ rel, ...restProps }) => {
  rel = rel ? `${rel} ` : ""

  const newRel =
    restProps.target === TARGET_VALUE_BLANK ? `${rel}${SECURITY_REL}` : rel

  return <a {...restProps} rel={newRel} />
}

export default A
