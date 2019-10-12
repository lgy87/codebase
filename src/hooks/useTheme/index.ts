import * as r from "ramda"
import { useSelector } from "react-redux"

import { theme } from "~/configs"
import { Theme } from "~/types"

export default function() {
  return useSelector(r.pathOr(theme, ["configs", "theme"])) as Theme
}
