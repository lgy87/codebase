/*
 * Guangyao Li
 * 2017/11/22
 * lgy87@foxmail.com
 */
import * as r from "ramda"
import { JSDOM } from "jsdom"

declare global {
  namespace NodeJS {
    interface Global {
      window: Window
      document: Document
      navigator: Navigator
      requestAnimationFrame: (callback: () => void) => Timeout
      cancelAnimationFrame: (id: Timeout) => void
      Image: HTMLImageElement
    }
  }
}

const jsdom = new JSDOM("<!doctype html><html><body></body></html>")
const { window } = jsdom
function copyProps(src: any, target: any) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  })
}

global.window = window
global.document = window.document
global.requestAnimationFrame = r.partialRight(setTimeout, [0])
global.cancelAnimationFrame = clearTimeout
copyProps(window, global)
