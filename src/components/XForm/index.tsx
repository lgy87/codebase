import React, { FC, memo } from "react"
import * as r from "ramda"
import Form from "react-jsonschema-form"

import * as widgets from "./widgets"

type Props = {
  idPrefix?: string
  tagName?: string
  schema?: any
}

const XForm: FC<Props> = ({ idPrefix, tagName, schema, ...props }) => {
  const children = r.pipe(
    // @ts-ignore
    r.values,
    r.map((property: any) => <widgets.Checkbox {...property} />),
  )(schema.properties)

  return React.createElement(tagName!, {}, children)
}

XForm.defaultProps = {
  tagName: "div",
}

export default memo(XForm)
