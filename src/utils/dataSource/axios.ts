import * as r from "ramda"
import * as ra from "ramda-adjunct"
import axios, { AxiosResponse, AxiosRequestConfig, Method } from "axios"
import qs from "qs"
import cookies from "js-cookie"
import { Response } from "~/types"

import routePrefix from "./routePrefix"

type ParamsDataType = Array<"data" | "params">
type ConfigHeaders = AxiosRequestConfig["headers"]
type ConfigData = AxiosRequestConfig["data"]

const pickData = r.prop<"data", any>("data")
const pickCode = r.prop<"code", number>("code")
const eqByString = r.eqBy(String)
const equal0 = eqByString(0)
const isHTTPCallSuccess = r.pipe(
  pickCode,
  equal0,
)

const instance = axios.create({
  baseURL: routePrefix,
  responseType: "json",
  transformRequest: [transformer],
  withCredentials: true,
})

instance.interceptors.request.use(enrichRequestOptions)

export default function dataSource<T = any>(options: AxiosRequestConfig) {
  return instance(options).then<T>(onDone)
}

interface AliasMethod1 {
  <T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
}

interface AliasMethod2 {
  <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
}

dataSource.get = createAlias1("get")
dataSource.delete = createAlias1("delete")
dataSource.head = createAlias1("head")
dataSource.post = createAlias2("post")
dataSource.put = createAlias2("put")
dataSource.patch = createAlias2("patch")

function createAlias1(method: Method) {
  const result: AliasMethod1 = (url, config) => {
    return dataSource({
      method,
      url,
      ...config,
    })
  }

  return result
}

function createAlias2(method: Method) {
  const result: AliasMethod2 = (url, data, config) => {
    return dataSource({
      method: "post",
      url,
      data,
      ...config,
    })
  }

  return result
}

function onDone<T>(resp: AxiosResponse<Response<T>>) {
  const data = pickData(resp)

  if (isHTTPCallSuccess(data)) {
    // 正常返回时，只把 payload 给调用者
    return pickData(data)
  }

  // 异常返回时，把 {code, msg, payload} 全部给调用者（因为调用者可能会根据不同的 code 作不同处理）
  throw data
}

function transformer(data: ConfigData, headers: ConfigHeaders) {
  if (isUploadFileRequest(headers)) {
    return data
  }

  return qs.stringify(data)
}

function isUploadFileRequest(headers: ConfigHeaders) {
  return (
    headers["Content-Type"] === "multipart/form-data" ||
    headers["content-type"] === "multipart/form-data"
  )
}

function enrichRequestOptions(options: AxiosRequestConfig) {
  const keys = whoToEnrich(options)
  const now = Date.now()
  const lt = cookies.get("gzqlt")

  addValueTo("_", now)
  addValueTo("lt", lt)

  return options

  function addValueTo<T>(target: string, value: T) {
    keys.forEach(key => (options[key][target] = value))
    return options
  }
}

// options 中 params 和 data 哪个不为空
function whoToEnrich(options: AxiosRequestConfig): ParamsDataType {
  const result = []

  if (ra.isPlainObject(options.data)) result.push("data")
  if (ra.isPlainObject(options.params)) result.push("params")

  return result as any
}
