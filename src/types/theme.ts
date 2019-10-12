import { Colors } from "@blueprintjs/core"

export type Theme = {
  value: keyof typeof Colors
  name: string
}
