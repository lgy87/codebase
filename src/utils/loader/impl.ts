import * as ra from "ramda-adjunct"

type AnyFn = (arg?: any) => any
export type ResourceType = "image" | "css" | "js"
type NodeNameType = "img" | "link" | "script"
type AttrNameType = "src" | "href"
type AttrPairs = Array<[string, string]>
type Target = "head" | "body"
type ElementDetail = {
  nodeName: NodeNameType
  attrName: AttrNameType
  additionalAttrs: AttrPairs
  target: Target
}
export type ResourceLoaderOptions = {
  src: string
  success?: AnyFn
  fail?: AnyFn
  done?: AnyFn
}
type LoaderOptions = ResourceLoaderOptions & {
  resourceType: ResourceType
}
type DictType = { [key in ResourceType]: ElementDetail }

const dict: DictType = {
  image: {
    nodeName: "img",
    attrName: "src",
    additionalAttrs: [],
    target: "body",
  },
  css: {
    nodeName: "link",
    attrName: "href",
    additionalAttrs: [["rel", "stylesheet"]],
    target: "head",
  },
  js: {
    nodeName: "script",
    attrName: "src",
    additionalAttrs: [],
    target: "head",
  },
}

export default function doLoad(
  document: Document,
  options: LoaderOptions,
): Promise<void> {
  const doc = document
  const config = dict[options.resourceType]
  const target = doc[config.target]
  const node = document.createElement(config.nodeName)

  setAttributesTo(config.additionalAttrs, node)

  const success = options.success || ra.noop
  const fail = options.fail || ra.noop
  const done = options.done || ra.noop

  return new Promise((resolve, reject) => {
    node.onload = function(e: any) {
      onSuccess(options.src)
      resolve(e)
      success(e)
      done()
    }
    node.onerror = function() {
      onFail(options.src)
      reject()
      fail()
      done()
    }

    // @ts-ignore
    node[config.attrName] = options.src

    try {
      target.appendChild(node)
    } catch {}
  })
}

function feedback(src: string, result: "成功" | "失败") {
  console.log(`[ ${src} ] 加载 ${result}`)
}
function onSuccess(src: string) {
  return feedback(src, "成功")
}
function onFail(src: string) {
  return feedback(src, "失败")
}
function setAttributesTo(
  attributes: AttrPairs,
  node: HTMLElement,
): HTMLElement {
  attributes.forEach(([attr, value]) => node.setAttribute(attr, value))
  return node
}
