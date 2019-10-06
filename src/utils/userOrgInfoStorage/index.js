import * as r from "ramda"

import storage from "~/utils/storage"
import { USER_ORG_INFO, actions } from "./config"

export default r.reduce(transform, {}, actions)

function transform(accu, key) {
  return {
    ...accu,
    [key]: r.partial(storage[key], [USER_ORG_INFO]),
  }
}
