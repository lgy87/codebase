import * as r from "ramda"
import { combineReducers } from "redux"

import { createReducer } from "~/utils/redux"

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
  .handleAction(setLoggedIn, r.T)
  .handleAction(setLoggedOut, r.F)

const orgs = createReducer({} as Orgs)
  .handleAction(setOrgs, (_, { payload }) => payload)
  .handleAction(clearOrgs, () => ({}))

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
