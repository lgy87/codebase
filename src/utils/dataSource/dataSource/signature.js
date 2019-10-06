import md5 from "js-md5"
import * as r from "ramda"

function isSecondValueEmpty(array) {
  // request 参数如果是 undefined 的话，不会被传输。
  // null 和 "" 是正常的 json，故没有问题。
  // 这里 为了 减少 signature string 的大小，所以把 null 和 "" 也去掉了
  return array[1] == null || array[1] === ""
}

function stringSorter(lhs, rhs) {
  if (lhs < rhs) return -1
  if (lhs > rhs) return 1
  return 0
}

function sortPairs(array) {
  return array.sort((lhs, rhs) => stringSorter(r.head(lhs), r.head(rhs)))
}

function signature(json) {
  if (Array.isArray(json)) {
    return signatureArray(json)
  } else if (json != null && typeof json === "object") {
    return signatureObject(json)
  }
  return String(json)
}

function signatureArray(array) {
  if (isSecondValueEmpty(array)) return ""
  return array.map(signature).join("")
}

function signatureObject(object) {
  return r.pipe(
    r.toPairs,
    sortPairs,
    r.map(signatureArray),
    r.join(""),
  )(object)
}

export default function doSignature(
  body = {},
  query = {},
  url = "",
  appKey = "",
) {
  const encryptionStr =
    url + signature(body) + signature(query) + appKey + "qeitgvelsghlno92tp"

  return md5(encryptionStr)
}
