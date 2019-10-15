import { combineReducers } from "redux"

import { createReducer } from "~/utils/redux"
import * as configs from "~/configs"

import { Orgs, User, Org } from "./Auth/types"
import {
  setLoggedIn,
  setLoggedOut,
  setOrgs,
  clearOrgs,
  setUser,
  clearUser,
  setOrg,
  setCurrentOrg,
} from "./actions"

const logged = createReducer(true)
  .handleAction(setLoggedIn, () => true)
  .handleAction(setLoggedOut, () => false)

const orgs = createReducer([] as Orgs)
  .handleAction(setOrgs, (_, { payload }) => payload)
  .handleAction(clearOrgs, () => [])

const user = createReducer({} as User)
  .handleAction(setUser, (_, { payload }) => payload)
  .handleAction(clearUser, () => ({} as User))

const org = createReducer({} as Org)
  .handleAction(setOrg, (_, { payload }) => payload)
  .handleAction(setCurrentOrg, (state, { payload: current }) => ({
    ...state,
    current,
  }))

export default combineReducers({
  logged,
  orgs,
  user,
  org,
})
