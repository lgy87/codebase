import React, { memo, FC } from "react"
import { FormGroup } from "@blueprintjs/core"

const FieldTemplate = (props: any) => {
  const {
    id,
    classNames,
    label,
    description,
    rawDescription,
    help,
    rawHelp,
    required,
    errors,
    rawErrors,
    children,
    hidden,
    readonly,
    disabled,
    displayLabel,
    fields,
    schema,
    uiSchema,
    formContext,
  } = props

  return (
    <FormGroup
      helperText={help}
      label={label}
      labelFor={id}
      labelInfo={required ? "*" : null}
    >
      {children}
    </FormGroup>
  )
}

export default FieldTemplate
