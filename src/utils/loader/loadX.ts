import doLoad, { ResourceLoaderOptions, ResourceType } from "./impl"

export type LoadResource = (
  args: string | ResourceLoaderOptions,
) => ReturnType<typeof doLoad>

export default function loadX(
  document: Document,
  args: string | ResourceLoaderOptions,
  resourceType: ResourceType,
) {
  const options = typeof args === "string" ? { src: args } : args
  return doLoad(document, { ...options, resourceType })
}
