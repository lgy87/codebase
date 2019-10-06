import dataSource from "./axios"
import getBaseUrl from "./getBaseUrl"

export default async function(options) {
  const baseUrl = getBaseUrl()

  return dataSource({
    ...options,
    url: `${baseUrl}/yiyou/attachment/passThrough`,
  })
}
