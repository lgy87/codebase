import { JSDOM } from "jsdom"
import { factory as loadImageFactory } from "./image"
import { factory as loadJsFactory } from "./javascript"
import { factory as loadCssFactory } from "./stylesheet"
import { LoadResource } from "./loadX"

describe("loader", () => {
  let document: Document
  let url: string

  describe("image", () => {
    let loadImage: LoadResource

    beforeAll(() => (url = "http://this-is-an-image.jpg"))
    beforeEach(() => {
      const jsdom = new JSDOM("<!doctype html><html><body></body></html>")
      const { window } = jsdom
      document = window.document
      loadImage = loadImageFactory(document)
    })
    it("img 标签可以同步地插入到body", () => {
      loadImage(url)

      const img = document.body.querySelector("img")!
      expect(img.tagName).toBe("IMG")
      expect(img.getAttribute("src")).toBe(url)
    })

    // it.skip("TODO: Image#onerror and Image#onload doesn't trigger in JSDOM.", async () => {
    //   const done = jest.fn()

    //   await loadImage({ src: url, done })
    //   expect(done).toHaveBeenCalledTimes(1)
    // })
  })

  describe("javascript", () => {
    let loadJs: LoadResource

    beforeAll(() => (url = "http://this-is-an-js.js"))

    beforeEach(() => {
      const jsdom = new JSDOM("<!doctype html><html><body></body></html>")
      const { window } = jsdom
      document = window.document
      loadJs = loadJsFactory(document)
    })
    it("script 标签可以同步地插入到 head", () => {
      loadJs(url)

      const script = document.head.querySelector("script")!
      expect(script.tagName).toBe("SCRIPT")
      expect(script.getAttribute("src")).toBe(url)
    })
    // it.skip("（TODO: script#onload & script#onerror 不触发回调函数）可以正常调用回调函数", async () => {
    //   const done = jest.fn()

    //   await loadJs({ src: url, done })
    //   expect(done).toHaveBeenCalledTimes(1)
    // })
  })

  describe("css", () => {
    let loadCss: LoadResource
    let url: string

    beforeAll(() => (url = "http://this-is-an-css.css"))
    beforeEach(() => {
      const jsdom = new JSDOM("<!doctype html><html><body></body></html>")
      const { window } = jsdom
      document = window.document
      loadCss = loadCssFactory(document)
    })
    it("script 标签可以同步地插入到 head", () => {
      loadCss(url)

      const link = document.head.querySelector("link")!
      expect(link.tagName).toBe("LINK")
      expect(link.getAttribute("href")).toBe(url)
    })
    // it.skip("（TODO: link#onload & link#onerror 不触发回调函数）可以正常调用回调函数", async () => {
    //   const done = jest.fn()

    //   await loadCss({ src: url, done })
    //   expect(done).toHaveBeenCalledTimes(1)
    // })
  })
})
