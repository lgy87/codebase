import * as r from "ramda"

import {
  OrgListInfo,
  User,
  OrgItem,
  OrgListPayload,
  StoredUserOrgs,
} from "../types"

const normalizeOrgItem = r.applySpec<OrgItem>({
  id: r.prop("orgId"),
  name: r.prop("orgFullName"),
  initialized: r.prop("isInitial"),
  logo: r.prop("orgLogo"),
})

const normalizeOrgList = r.map(normalizeOrgItem)

export default function normalizeUserOrgInfo(userOrg: OrgListPayload) {
  const user = r.applySpec<User>({
    id: r.prop("userId"),
    name: r.prop("name"),
    username: r.prop("username"),
    avatar: r.prop("headPicture"),
    email: r.prop("email"),
  })(userOrg)

  const orgInfo: OrgListInfo = r.propOr({}, "orgListInfo", userOrg)

  const org = {
    current: r.prop("orgId", userOrg),
    defaults: String(orgInfo.appDefaultOrgId),
  }

  const orgs = normalizeOrgList(orgInfo.orgList)

  return {
    user,
    org,
    orgs,
  } as StoredUserOrgs
}
