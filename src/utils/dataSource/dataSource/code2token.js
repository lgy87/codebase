import * as r from "ramda"

import dataSource from "./axios"
import getBaseUrl from "./getBaseUrl"

export default async function(code) {
  const baseUrl = getBaseUrl()

  return dataSource({
    url: `${baseUrl}/yiyou/api/code2token?code=${code}`,
    method: "GET",
  }).then(r.prop("data"))
}
