import * as r from "ramda"

import storage from "~/utils/storage"
import { USER, ORG, ORGS, actions, ActionType } from "./config"

export const userStorage = r.reduce(createTransformer(USER), {}, actions)
export const orgsStorage = r.reduce(createTransformer(ORGS), {}, actions)
export const orgStorage = r.reduce(createTransformer(ORG), {}, actions)

function createTransformer(name: string) {
  return function transform(accu: any, key: ActionType) {
    return {
      ...accu,
      [key](value: any) {
        return (storage as any)[key](name, value)
      },
    }
  }
}
