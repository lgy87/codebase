import { ResourceLoaderOptions } from "./impl"
import loadX from "./loadX"

export function factory(document: Document) {
  return function loadCss(args: string | ResourceLoaderOptions) {
    return loadX(document, args, "css")
  }
}

export default factory(document)
