import axios from "axios"
import * as r from "ramda"
import * as ra from "ramda-adjunct"
import _ from "lodash/fp"

import env from "~/utils/env"
import appName from "~/configs/appName"

const DEFAULT_ERROR_MESSAGE = "网络连接失败:( 请检查网络是否正常!"
const pickData = r.propOr({}, "data")
const getErrorMessages = r.pipe(
  r.pathOr([], ["response", "data", "errors"]),
  r.pluck("message"),
  r.join("\n"),
)
const pickMsgsFromBusinessError = r.pipe(
  r.map(JSON.parse),
  r.pluck("msg"),
)
const tryToExtractErrorMsg = r.tryCatch(pickMsgsFromBusinessError, r.identity)
const getBusinessErrorMessages = r.pipe(
  r.prop("errors"),
  r.pluck("message"),
  tryToExtractErrorMsg,
  r.join("\n"),
)

const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
    "src-website": "MOBILE",
    appname: appName,
  },
  responseType: "json",
  timeout: Number.MAX_SAFE_INTEGER,
  transformRequest: [JSON.stringify],
  withCredentials: true,
})

instance.interceptors.request.use(onRequest)
instance.interceptors.response.use(onDone, onError)

instance.hasPassportSet = hasPassportSet

instance.getAccessToken = getAccessToken
instance.setAccessToken = setAccessToken

instance.getPassport = getPassport
instance.setPassport = setPassport

instance.getDomainName = getDomainName
instance.setDomainName = setDomainName

instance.getBookCode = getBookCode
instance.setBookCode = setBookCode

instance.setAppName = setAppName

export default instance

const BOOK_CODE = "__BOOK_CODE__"
const DOMAIN_NAME = "__DOMAIN_NAME__"
const PASSPORT = "__PASSPORT__"
const ACCESS_TOKEN = "__ACCESS_TOKEN__"

function setAppName(appname) {
  instance.defaults.headers.appname = appname
}

function getBookCode() {
  return instance[BOOK_CODE]
}
function setBookCode(bookCode) {
  instance[BOOK_CODE] = bookCode
}

function getDomainName() {
  return instance[DOMAIN_NAME]
}
function setDomainName(domainName) {
  instance[DOMAIN_NAME] = domainName
}

function getAccessToken() {
  return instance[ACCESS_TOKEN]
}

function setAccessToken(token) {
  instance.defaults.headers.accessToken = token
  instance[ACCESS_TOKEN] = token
}

function getPassport() {
  return instance[PASSPORT]
}
function setPassport(passport) {
  instance.defaults.headers.Authorization = "Bearer " + passport
  instance[PASSPORT] = passport
}
function hasPassportSet() {
  return !!instance[PASSPORT]
}

function onRequest(config) {
  addUniqueIdToParams(config)

  return config
}

function onDone(resp) {
  const payload = pickData(resp)

  if (hasBusinessError(payload)) {
    throw getBusinessErrorMessages(payload)
  }
  return payload
}

function onError(error) {
  if (env.isProd) {
    throw DEFAULT_ERROR_MESSAGE
  }

  const errorDetail = getErrorMessages(error)
  if (ra.isEmptyString(errorDetail)) {
    throw error
  }
  throw errorDetail
}

function hasBusinessError(payload) {
  return r.propSatisfies(ra.isTruthy, "errors", payload)
}

function addUniqueIdToParams(config) {
  if (!config.params) {
    config.params = {}
  }

  config.params["user_req_id"] = _.uniqueId()
}
