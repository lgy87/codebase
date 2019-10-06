import * as r from "ramda"

import dataSource, { jsonp } from "~/utils/dataSource"
import { loginStateUrl, gzqLoginUrl, gzqLogoutUrl, errorCodes } from "./config"
import userOrgInfoStorage from "~/utils/userOrgInfoStorage"

import normalizeUserOrgInfo from "./normalizeUserOrgInfo"
import {
  AuthInfo,
  LoginResponse,
  LoginPayload,
  LoginStateResponse,
  OrgListPayload,
  LoginRequestOption,
} from "./types"

export default { login, logout }

async function login(authInfo: AuthInfo) {
  // Has logged into GZQ
  if (isLoggedIntoGZQ()) return userOrgInfoStorage.getItem()

  let ciaState = await getCiaLoginState()

  try {
    const options = buildLoginRequestConfig(authInfo, ciaState)
    await doLogin(options)

    const orgListInfo = await getOrgList()
    const normalizedUserOrgInfo = normalizeUserOrgInfo(orgListInfo)

    await userOrgInfoStorage.setItem(normalizedUserOrgInfo)
    return normalizedUserOrgInfo
  } catch (e) {
    if (isCaptcha(e)) {
      return Promise.reject(e.data.result)
    }
    return Promise.reject(e)
  }
}

function isCaptcha(resp: LoginResponse): boolean {
  return String(resp.code) === errorCodes.LOGIN_GZQ_CAPTCHA
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
    .then(userOrgInfoStorage.removeItem)
    .then(_ => ({
      message: "退出成功!",
    }))
}

async function doLogin(options: LoginRequestOption): Promise<LoginPayload> {
  return dataSource
    .post<LoginRequestOption, LoginPayload>(gzqLoginUrl, options)
    .catch(e => Promise.reject(e))
}

function buildLoginRequestConfig(
  authInfo: AuthInfo,
  ciaState: LoginStateResponse,
) {
  return {
    clientVersion: "2.0",
    deviceType: "WEB",
    ...authInfo,
    ...ciaState,
    authCode: ciaState.auth_code,
  }
}
