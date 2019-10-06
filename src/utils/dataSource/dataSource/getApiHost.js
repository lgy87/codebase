import * as r from "ramda"

import env from "~/utils/env"

export default function getApiHost() {
  // 开发时，使用webpack-dev-server的代理设置
  if (env.isDev) return ""

  return r.pipe(
    getEnvPrefix,
    makeApiHost,
  )(window)
}

export function getEnvPrefix() {
  const host = r.path(["location", "host"])(window)
  const envs = ["dev-", "pre-test-", "test-", "inte-"]

  return envs.find(env => host.startsWith(env)) || ""
}

function makeApiHost(prefix) {
  return `${prefix}cloud.chanjet.com`
}
