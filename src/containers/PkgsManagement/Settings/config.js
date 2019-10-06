import * as r from "ramda"
import * as ra from "ramda-adjunct"
import _ from "lodash/fp"

export const sources = [
  { name: "taobao", url: "https://registry.npm.taobao.org/" },
  { name: "npm", url: "https://registry.npmjs.org/" },
  { name: "cnpm", url: "http://r.cnpmjs.org/" },
  { name: "nj", url: "https://registry.nodejitsu.com/" },
  { name: "rednpm", url: "http://registry.mirror.cqupt.edu.cn/" },
  { name: "npmMirror", url: "https://skimdb.npmjs.com/registry/" },
  { name: "edunpm", url: "http://registry.enpmjs.org/" },
  { name: "chanjet", url: "https://registry-npm.rd.chanjet.com/" },
]

export const clients = [
  { icon: "drag-handle-horizontal", text: "npm" },
  { icon: "drag-handle-vertical", text: "yarn" },
]

const STORAGE_KEYS = [
  "SETTING",
  "SETTING_SOURCES",
  "SETTING_ACTIVE_CLIENT_INDEX",
  "SETTING_ACTIVE_SOURCE_INDEXES",
]

export const storageKeys = r.pipe(
  ra.renameKeys(STORAGE_KEYS),
  ra.renameKeysWith(_.camelCase),
)(STORAGE_KEYS)
