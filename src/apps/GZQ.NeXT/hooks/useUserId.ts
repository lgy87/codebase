import { useSelector } from "react-redux"
import * as r from "ramda"

export default function() {
  return useSelector(r.path(["gzq", "user", "id"]))
}
