import * as r from "ramda"
import * as ra from "ramda-adjunct"

import {
  normalizedImageCategory,
  supportedFormat,
  supportedSize,
  ignoredFormat,
} from "./config"
import notEquals from "~/utils/notEquals"

const areImageAndSizeAllSupported = (src, size) =>
  supportedSize.includes(size) && supportedFormat.test(src)
const removeMultiplySizeSuffix = src => src.replace(normalizedImageCategory, "")
const getFileExtension = r.takeLastWhile(notEquals("."))

const getNormalizedImage = r.curry((size, src) => {
  // 历史原因，这几种图片没有生成多尺寸图片
  if (ignoredFormat.test(src)) {
    // 即使传入的是带有多尺寸样式的图片地址，也能返回 原始的正确地址
    return removeMultiplySizeSuffix(src)
  }

  const matched = normalizedImageCategory.exec(src)

  if (ra.isFalsy(matched)) {
    if (areImageAndSizeAllSupported(src, size)) {
      const extension = getFileExtension(src)
      return `${src}${size}.${extension}`
    }

    return src
  }

  const { extension, size: sizeInSrc } = r.propOr({}, "groups", matched)
  if (r.equals(size, sizeInSrc)) {
    return src
  }

  const re = new RegExp(sizeInSrc + "\\." + extension + "$")
  return src.replace(re, `${size}.${extension}`)
})

export default getNormalizedImage
export const getAvatar = getNormalizedImage(32)
