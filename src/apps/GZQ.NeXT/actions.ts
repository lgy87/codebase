import { createAction } from "~/utils/redux"
import { User, Org, Orgs } from "./Auth/types"

type CurrentOrg = Org["current"]

export const setLoggedIn = createAction("GZQ.NeXT/SET_LOGGED_IN")()
export const setLoggedOut = createAction("GZQ.NeXT/SET_LOGGED_OUT")()
export const setOrgs = createAction("GZQ.NeXT/SET_ORGS")<Orgs>()
export const clearOrgs = createAction("GZQ.NeXT/CLEAR_ORGS")()
export const setUser = createAction("GZQ.NeXT/SET_USER")<User>()
export const clearUser = createAction("GZQ.NeXT/CLEAR_USER")()
export const setOrg = createAction("GZQ.NeXT/SET_ORG")<Org>()
export const setCurrentOrg = createAction("GZQ.NeXT/SET_CURRENT_ORG")<
  CurrentOrg
>()
