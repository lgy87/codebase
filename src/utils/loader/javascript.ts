import { ResourceLoaderOptions } from "./impl"
import loadX from "./loadX"

export function factory(document: Document) {
  return function loadJs(args: string | ResourceLoaderOptions) {
    return loadX(document, args, "js")
  }
}

export default factory(document)
