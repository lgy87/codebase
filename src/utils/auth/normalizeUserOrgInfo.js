import * as r from "ramda"

const normalizeOrgItem = r.applySpec({
  initialized: r.prop("isInitial"),
  id: r.prop("orgId"),
  logo: r.prop("orgLogo"),
  name: r.prop("orgFullName"),
})

const normalizeOrgList = r.map(normalizeOrgItem)

export default function normalizeUserOrgInfo(userOrgInfo) {
  const userInfo = r.applySpec({
    org: {
      current: r.prop("orgId"),
    },
    user: {
      id: r.prop("userId"),
      name: r.prop("name"),
      username: r.prop("username"),
      avatar: r.prop("headPictrue"),
      email: r.prop("email"),
    },
  })(userOrgInfo)

  const orgInfo = r.pipe(
    r.prop("orgListInfo"),
    JSON.parse,
  )(userOrgInfo)

  const org = {
    ...userInfo.org,
    defaults: String(orgInfo.appDefaultOrgId),
  }

  return {
    ...userInfo,
    org,
    orgs: normalizeOrgList(orgInfo.orgList),
  }
}
