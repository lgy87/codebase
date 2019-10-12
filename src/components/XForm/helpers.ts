import { ChangeEvent } from "react"
import { AnyFn } from "~/types/common"

export function onValueChange(onChange: AnyFn) {
  return function(e: ChangeEvent<HTMLInputElement>) {
    return onChange(e.target.value)
  }
}
