import * as r from "ramda"

import dataSource, { jsonp } from "~/utils/dataSource"
import { loginStateUrl, gzqLoginUrl, gzqLogoutUrl } from "./config"
import {
  userStorage,
  orgsStorage,
  orgStorage,
} from "~/utils/userOrgInfoStorage"

import normalizeUserOrgInfo from "./normalizeUserOrgInfo"
import {
  AuthInfo,
  LoginResponse,
  LoginPayload,
  LoginStateResponse,
  OrgListPayload,
  LoginRequestOption,
} from "../types"

export default { login, logout }

async function login(authInfo: AuthInfo) {
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
  const GZQ_COOKIE = "gongzuoquan.info="

  return r.pipe(
    r.split(";"),
    r.map(r.trim),
    r.any(r.startsWith(GZQ_COOKIE)),
  )(document.cookie)
}

async function logout() {
  return dataSource
    .post(gzqLogoutUrl)
    .then(() =>
      Promise.all([
        userStorage.removeItem(),
        orgsStorage.removeItem(),
        orgStorage.removeItem(),
      ]),
    )
    .then(_ => ({
      message: "退出成功!",
    }))
}

async function doLogin(options: LoginRequestOption): Promise<LoginPayload> {
  return dataSource
    .post<LoginRequestOption, LoginPayload>(gzqLoginUrl, options)
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
