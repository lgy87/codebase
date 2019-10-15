import * as r from "ramda"
import * as ra from "ramda-adjunct"
import axios, {
  AxiosResponse,
  AxiosRequestConfig,
  AxiosTransformer,
} from "axios"
import qs from "qs"
import cookies from "js-cookie"

import routePrefix from "./routePrefix"

const pickData = r.prop("data")
const pickCode = r.prop("code")
const eqByString = r.eqBy(String)
const equal0 = eqByString(0)
const isHTTPCallSuccess = r.pipe(
  pickCode,
  equal0,
)

const instance = axios.create({
  baseURL: routePrefix,
  responseType: "json",
  timeout: 30000,
  transformRequest: [transformer],
  withCredentials: true,
})

instance.interceptors.request.use(enrichRequestOptions, r.identity)
instance.interceptors.response.use(onDone, r.identity)

export default instance

function onDone(resp: AxiosResponse) {
  const data = pickData(resp)

  if (isHTTPCallSuccess(data)) {
    return pickData(data) // 正常返回时，只把 payload 给调用者
  }

  // 异常返回时，把 {code, msg, payload} 全部给调用者（因为调用者可能会根据不同的 code 作不同处理）
  return Promise.reject(data)
}

function transformer(data, headers) {
  if (isUploadFileRequest(headers)) {
    return data
  }

  return qs.stringify(data)
}

function isUploadFileRequest(headers) {
  return (
    headers["Content-Type"] === "multipart/form-data" ||
    headers["content-type"] === "multipart/form-data"
  )
}

function addLtTo(options, keys) {
  const lt = cookies.get("gzqlt")

  keys.forEach(key => (options[key].lt = lt))

  return options
}

function addTimestampTo(options, keys) {
  const now = Date.now()

  keys.forEach(key => (options[key]._ = now))

  return options
}

function enrichRequestOptions(options) {
  const keys = whoToEnrich(options)

  addLtTo(options, keys)
  addTimestampTo(options, keys)

  return options
}

// options 中 params 和 data 哪个不为空
function whoToEnrich(options) {
  const result = []

  if (ra.isPlainObject(options.data)) result.push("data")
  if (ra.isPlainObject(options.params)) result.push("params")

  return result
}
