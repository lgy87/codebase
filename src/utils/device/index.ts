import * as r from "ramda"
import * as ra from "ramda-adjunct"

import makeDict from "@/utils/makeDict"

const ua = window.navigator.userAgent

const devices = ["android", "iPhone"]

const result = r.pipe(
  makeDict,
  r.mapObjIndexed(device => new RegExp(device, "gi").test(ua)),
)(devices)

const web = r.pipe(
  r.values,
  r.all(ra.isFalsy),
)(result)

export default {
  ...result,
  web,
}
