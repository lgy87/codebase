import * as r from "ramda"

import storage from "~/utils/storage"
import { USER_ORG_INFO, actions, ActionType } from "./config"

export default r.reduce(transform, {}, actions)

function transform(accu: any, key: any) {
  return {
    ...accu,
    [key](value: any) {
      // @ts-ignore
      return storage[key](USER_ORG_INFO, value)
    },
    // [key]: r.partial(storage[key], [USER_ORG_INFO]),
  }
}
