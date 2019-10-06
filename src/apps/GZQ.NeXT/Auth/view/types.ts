import React from "react"
import { IconName } from "@blueprintjs/core"

export type ConfigType = {
  leftIcon: IconName
  placeholder: string
  type: React.InputHTMLAttributes<HTMLInputElement>["type"]
  "data-field": string
}
