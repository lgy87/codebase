import locales from "enums/locales"
import mergeAll from "lodash/fp/mergeAll"
import result from "lodash/result"

const fallback = locales.en_us
const active   = locales.zh_cn

export default function config(info) {
  const merged = mergeAll(
    {},
    info[fallback],
    info[active],
  )
  
  return arg => result(
    merged,
    arg,
    () => _
      .chain(arg)
      .concat()
      .takeRight(1)
      .split(".")
      .takeRight(1)
      .startCase()
      .value(),
  )
}

