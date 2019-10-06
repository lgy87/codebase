import * as r from "ramda"
import dataSource from "./axios"

import getBaseUrl from "./getBaseUrl"

export default async function(query, variables) {
  const baseUrl = getBaseUrl()
  const cia = dataSource.hasPassportSet() ? "" : "cia/"

  return dataSource({
    url: `${baseUrl}/mobile/${cia}graphql`,
    method: "POST",
    data: {
      query,
      variables,
    },
  }).then(r.prop("data"))
}
