import * as r from "ramda"
import dataSource from "./axios"
import getBaseUrl from "./getBaseUrl"

export default async function(productId, boName, data) {
  const baseUrl = getBaseUrl()

  return dataSource({
    url: `${baseUrl}/product/image/${productId}/${boName}`,
    method: "put",
    data,
  })
}
