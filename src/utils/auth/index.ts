import * as r from "ramda"

import dataSource, { jsonp } from "~/utils/dataSource"
import { loginStateUrl, gzqLoginUrl, gzqLogoutUrl, errorCodes } from "./config"
import userOrgInfoStorage from "~/utils/userOrgInfoStorage"
import { Response } from "~/types/common"

import normalizeUserOrgInfo from "./normalizeUserOrgInfo"

export default { login, logout }

async function login(authInfo: AuthInfo) {
  // Has logged into GZQ
  if (isLoggedIntoGZQ()) return userOrgInfoStorage.getItem()

  let ciaState = await getCiaLoginState()

  try {
    const options = buildGZQLoginRequestConfig(authInfo, ciaState)
    const loginResponse = await loginToGZQ(options)

    if (isCaptcha(loginResponse)) {
      return Promise.reject(loginResponse.data.result)
    }

    const normalizedUserOrgInfo = normalizeUserOrgInfo(loginResponse)
    await userOrgInfoStorage.setItem(normalizedUserOrgInfo)
    return normalizeUserOrgInfo
  } catch (e) {
    return Promise.reject({
      message: e.errorMessage,
      code: e.errorCode,
    })
  }
}

function isCaptcha(resp: GZQLoginResponse): boolean {
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
async function getOrgList() {
  // TODO
  return
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

async function loginToGZQ(
  options: GZQRequestConfig,
): Promise<GZQLoginResponse> {
  return dataSource
    .post<GZQRequestConfig, GZQLoginResponse>(gzqLoginUrl, options)
    .catch(e => {
      console.log("登录GZQ失败！", e)
      return Promise.reject("")
    })
}

function buildGZQLoginRequestConfig(
  authInfo: AuthInfo,
  ciaState: LoginStateResponse,
) {
  return {
    clientVersion: "2.0",
    deviceType: "WEB",
    ...authInfo,
    ...ciaState,
    authCode: ciaState.auth_code,
    _: Date.now(),
  }
}

type LoginStateResponse = {
  auth_code?: string
  code?: string
}
export type AuthInfo = {
  account: string
  password: string
}
type GZQRequestConfig = {
  account: string
  password: string
  clientVersion: string
  deviceType: string
  auth_code?: string
  code?: string
  _: number
}
type GZQLoginPayload = {
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
type GZQLoginResponse = Response<GZQLoginPayload>
type OrgListItem = {
  orgFullName: string
  orgLogo: string
  isInitial: string
  orgId: string
}
type OrgListInfo = {
  orgList: Array<OrgListItem>
  appDefaultOrgId: number
}
type OrgListPayload = {
  orgListInfo: OrgListInfo
  username: string
  email: string
  userId: string
  headPicture: string
  name: string
}
type OrgListResponse = Response<OrgListPayload>
