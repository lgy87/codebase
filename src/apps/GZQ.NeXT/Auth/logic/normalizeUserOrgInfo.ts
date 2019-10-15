import * as r from "ramda"

import { OrgListInfo, UserOrgs, OrgListPayload } from "../types"

const normalizeOrgItem = r.applySpec({
  initialized: r.prop("isInitial"),
  id: r.prop("orgId"),
  logo: r.prop("orgLogo"),
  name: r.prop("orgFullName"),
})

const normalizeOrgList = r.map(normalizeOrgItem as any)

export default function normalizeUserOrgInfo(userOrg: OrgListPayload) {
  const user = r.applySpec({
    id: r.prop("userId"),
    name: r.prop("name"),
    username: r.prop("username"),
    avatar: r.prop("headPicture"),
    email: r.prop("email"),
  })(userOrg)

  const orgInfo = r.propOr({}, "orgListInfo", userOrg) as OrgListInfo

  const org = {
    current: r.prop("orgId", userOrg),
    defaults: String(orgInfo.appDefaultOrgId),
  }

  return {
    user,
    org,
    orgs: normalizeOrgList(orgInfo.orgList),
  } as UserOrgs
}
