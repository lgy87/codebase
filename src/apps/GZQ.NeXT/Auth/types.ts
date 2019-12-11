import { Response } from "~/types/common"

export type LoginStateResponse = {
  auth_code?: string
  code?: string
}
export type AuthInfo = {
  account: string
  password: string
  uuid?: string
  imageNo?: string
}
export interface LoginRequestOption extends AuthInfo {
  clientVersion: string
  deviceType: string
  deviceId?: string
  authCode?: string
  code?: string
}
export type OrgListRequestOption = {
  needOrgLists: 1 | 0
}
export type LoginPayload = {
  result: {
    name: string
    mobile: string
    headPictrue: string
    isinitial: string
    lt: string
    Origid: string
    email: string
    OrgList: Array<{}> | string
    uuid?: string
  }
}
export type LoginResponse = Response<LoginPayload>
export type OrgListItem = {
  orgFullName: string
  orgLogo: string
  isInitial: string
  orgId: string
}
export type OrgListInfo = {
  orgList: Array<OrgListItem>
  appDefaultOrgId: number
}
export type OrgListPayload = {
  orgListInfo: OrgListInfo
  username: string
  email: string
  userId: string
  headPicture: string
  name: string
  orgId: string
}
export type OrgListResponse = Response<OrgListPayload>
export type IDName = {
  id: string
  name: string
}
export type User = IDName & {
  username: string
  avatar: string
  email: string
}
export type Org = {
  current: string
  defaults: string
}
export type OrgItem = IDName & {
  initialized: string
  logo: string
}
export type OrgList = Array<OrgItem>
export type Orgs = {
  [key in OrgItem["id"]]: OrgItem
}
export type UserOrgs = {
  user: User
  org: Org
  orgs: Orgs
}
export type StoredUserOrgs = {
  user: User
  org: Org
  orgs: OrgList
}
