import * as r from "ramda"

import dataSource from "./axios"
import getBaseUrl from "./getBaseUrl"

export default async function(data) {
  const baseUrl = getBaseUrl()

  return dataSource({
    url: `${baseUrl}/yiyou/attachment/uploadBase64Image`,
    method: "POST",
    data,
  }).then(r.prop("data"))
}
