import { ResourceLoaderOptions } from "./impl"
import loadX from "./loadX"

export function factory(document: Document) {
  return function loadImage(args: string | ResourceLoaderOptions) {
    return loadX(document, args, "image")
  }
}

export default factory(document)
