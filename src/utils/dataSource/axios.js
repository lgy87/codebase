import axios from "axios"
import qs from "qs"
import * as r from "ramda"
import routePrefix from "./routePrefix"

const pickData = r.prop("data")
const pickCode = r.prop("code")
const eqByString = r.eqBy(String)
const equal200 = eqByString(200)
const isHTTPCallSuccess = r.pipe(
  pickCode,
  equal200,
)

const instance = axios.create({
  baseURL: routePrefix,
  responseType: "json",
  timeout: 30000,
  transformRequest: [transformer],
  withCredentials: true,
})

instance.interceptors.response.use(onDone, r.identity)

export default instance

function onDone(resp) {
  const data = pickData(resp)

  if (isHTTPCallSuccess(data)) {
    return pickData(data) // 正常返回时，只把 payload 给调用者
  } else {
    return Promise.resolve(data) // 异常返回时，把 {code, msg, payload} 全部给调用者（因为调用者可能会根据不同的 code 作不同处理）
  }
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
