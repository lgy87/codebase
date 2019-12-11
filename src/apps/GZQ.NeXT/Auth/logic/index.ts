import * as r from "ramda"
import * as ra from "ramda-adjunct"
import cookie from "js-cookie"

import dataSource, { jsonp } from "~/utils/dataSource"
import {
  userStorage,
  orgsStorage,
  orgStorage,
} from "~/utils/userOrgInfoStorage"

import {
  AuthInfo,
  LoginResponse,
  LoginPayload,
  LoginStateResponse,
  OrgListPayload,
  LoginRequestOption,
  StoredUserOrgs,
} from "../types"

import { loginStateUrl, gzqLoginUrl, gzqLogoutUrl } from "./config"
import normalizeUserOrgInfo from "./normalizeUserOrgInfo"

export default { login, logout }

async function login(authInfo: AuthInfo): Promise<StoredUserOrgs> {
  // Has logged into GZQ
  if (isLoggedIntoGZQ()) {
    const [user, orgs, org] = await Promise.all([
      userStorage.getItem(),
      orgsStorage.getItem(),
      orgStorage.getItem(),
    ])
    return { user, orgs, org }
  }

  try {
    const ciaState = await getCiaLoginState()

    const options = buildLoginRequestOption(authInfo, ciaState)
    await doLogin(options)

    const orgListInfo = await getOrgList()
    const normalizedUserOrgInfo = normalizeUserOrgInfo(orgListInfo)

    await Promise.all([
      userStorage.setItem(normalizedUserOrgInfo.user),
      orgsStorage.setItem(normalizedUserOrgInfo.orgs),
      orgStorage.setItem(normalizedUserOrgInfo.org),
    ])
    return normalizedUserOrgInfo
  } catch (e) {
    e.message = e.msg

    if (hasUUID(e)) {
      return Promise.reject({ ...e, uuid: getUUID(e) })
    }

    return Promise.reject(e)
  }
}

function hasUUID(resp: LoginResponse): boolean {
  return r.pathOr(false, ["data", "result", "uuid"], resp)
}
function getUUID(resp: LoginResponse): string {
  return r.path(["data", "result", "uuid"], resp) as string
}

async function getCiaLoginState(): Promise<LoginStateResponse> {
  return jsonp.get(loginStateUrl, {
    params: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      client_id: "da6e3f87-bb6f-4cdc-ac78-64b0ed4237c7",
      jsonp: true,
      r: Math.random(),
      _: Date.now(),
    },
  })
}

async function getOrgList(): Promise<OrgListPayload> {
  return dataSource.get("/quan/web/team/findUserOrgsNum", {
    params: { needOrgLists: 1 },
  })
}

export const isLoggedIntoGZQ = () => {
  return ra.isTruthy(cookie.get("gongzuoquan.info"))
}

async function logout() {
  return dataSource.post(gzqLogoutUrl)
}

async function doLogin(options: LoginRequestOption): Promise<LoginPayload> {
  return dataSource
    .post<LoginPayload>(gzqLoginUrl, options)
    .catch(e => Promise.reject(e))
}

function buildLoginRequestOption(
  authInfo: AuthInfo,
  ciaState: LoginStateResponse,
): LoginRequestOption {
  const base = {
    clientVersion: "NeXT",
    deviceType: "WEB",
  }

  return {
    ...base,
    ...authInfo,
    ...ciaState,
    authCode: ciaState.auth_code,
  }
}
