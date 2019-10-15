export type ActionType = "getItem" | "setItem" | "removeItem"
export const USER = "USER"
export const ORGS = "ORGS"
export const ORG = "ORG"
export const actions: Array<ActionType> = ["getItem", "setItem", "removeItem"]

export default {
  USER,
  ORGS,
  ORG,
  actions,
}
