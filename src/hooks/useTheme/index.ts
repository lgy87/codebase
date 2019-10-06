import * as r from "ramda"
import { useSelector } from "react-redux"

import { theme } from "~/configs"

export default function() {
  return useSelector(r.pathOr(theme, ["configs", "theme"]))
}
