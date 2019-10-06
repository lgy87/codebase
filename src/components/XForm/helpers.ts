import { ChangeEvent } from "react"
import { AnyFn } from "~/types"

export function onValueChange(onChange: AnyFn) {
  return function(e: ChangeEvent<HTMLInputElement>) {
    return onChange(e.target.value)
  }
}
