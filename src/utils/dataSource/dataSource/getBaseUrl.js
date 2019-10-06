import dataSource from "./axios"

export default function getBaseUrl() {
  const appName = window.appName
  const domainName = dataSource.getDomainName() || "0"
  const bookCode = dataSource.getBookCode() || "0000"

  return `/${appName}/${domainName}/${bookCode}`
}
