import jsonp from "jsonp"
import qs from "qs"
import * as r from "ramda"
import * as ra from "ramda-adjunct"

// 统一成 axios 的调用接口,
export default function doRequest(url, config) {
  if (ra.isString(url)) {
    const fullUrl = buildUrlWithParams(url, config)

    return new Promise((resolve, reject) => {
      jsonp(fullUrl, undefined, (err, resp = {}) => {
        if (err) reject(err)
        if (isRequestLogicError(resp)) reject(resp)
        resolve(resp)
      })
    })
  }

  if (!isGetRequest(config)) {
    console.warn("Jsonp only support [get] http request!")
  }

  config = url
  url = r.prop("url", config)
  return doRequest(url, config)
}

doRequest.get = doRequest

function buildUrlWithParams(url, config) {
  const hasParams = r.pipe(
    r.prop("params"),
    ra.isTruthy,
  )
  return r.when(r.always(hasParams(config)), build)(url)

  function build(url) {
    const urlWithoutLastSlash = ensureHasNotLastSlash(url)
    const symbol = getJoinDelimiter(urlWithoutLastSlash)
    return (
      urlWithoutLastSlash +
      symbol +
      qs.stringify(r.propOr("", "params", config))
    )
  }
}

function ensureHasNotLastSlash(url) {
  return r.endsWith("/", url) ? r.init(url) : url
}

function getJoinDelimiter(url) {
  return hasQuery(url) ? "&" : "?"
}
const isGetRequest = r.pipe(
  r.prop("method"),
  r.toLower,
  r.equals("get"),
)

const isAbsolutePath = r.either(r.startsWith("https:"), r.startsWith("http:"))
const hasQuery = r.contains("?")

const pickCode = r.props(["code", "errorCode"])
const isRequestLogicError = r.pipe(
  pickCode,
  r.map(Number), // 调 cia 查询 sso 状态 的接口，返回的有 code（16进制的串）
  ra.compact,
  r.length,
  r.lt(0),
)
