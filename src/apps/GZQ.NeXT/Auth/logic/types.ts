import { Response } from "~/types/common"

export type LoginStateResponse = {
  auth_code?: string
  code?: string
}
export type AuthInfo = {
  account: string
  password: string
}
export type LoginRequestOption = {
  account: string
  password: string
  clientVersion: string
  deviceType: string
  auth_code?: string
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

export type User = {
  id: string
  name: string
  username: string
  avatar: string
  email: string
}
export type Org = {
  current: string
  defaults: string
}
export type OrgItem = {
  id: string
  initialized: string
  logo: string
  name: string
}
export type UserOrgs = {
  user: User
  org: Org
  orgs: Array<OrgItem>
}
