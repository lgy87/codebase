import * as r from "ramda"
import * as ra from "ramda-adjunct"

import getNormalizedImage from "./index"

describe("getNormalizedImage", () => {
  it("能够正确返回 png 图片文件的多尺寸版本", () => {
    const imgSrc = "http://image.png"

    expect(getNormalizedImage(32, imgSrc)).toBe(`${imgSrc}32.png`)
    expect(getNormalizedImage(64, imgSrc)).toBe(`${imgSrc}64.png`)
    expect(getNormalizedImage(120, imgSrc)).toBe(`${imgSrc}120.png`)
    expect(getNormalizedImage(200, imgSrc)).toBe(`${imgSrc}200.png`)
  })

  it("能够正确返回 jpg 图片文件的多尺寸版本", () => {
    const imgSrc = "http://image.jpg"

    expect(getNormalizedImage(32, imgSrc)).toBe(`${imgSrc}32.jpg`)
    expect(getNormalizedImage(64, imgSrc)).toBe(`${imgSrc}64.jpg`)
    expect(getNormalizedImage(120, imgSrc)).toBe(`${imgSrc}120.jpg`)
    expect(getNormalizedImage(200, imgSrc)).toBe(`${imgSrc}200.jpg`)
  })
  it("能够正确返回 jpeg 图片文件的多尺寸版本", () => {
    const imgSrc = "http://image.jpeg"

    expect(getNormalizedImage(32, imgSrc)).toBe(`${imgSrc}32.jpeg`)
    expect(getNormalizedImage(64, imgSrc)).toBe(`${imgSrc}64.jpeg`)
    expect(getNormalizedImage(120, imgSrc)).toBe(`${imgSrc}120.jpeg`)
    expect(getNormalizedImage(200, imgSrc)).toBe(`${imgSrc}200.jpeg`)
  })
  it("除了 png，jpg，jpeg 类型的图片，其它类型 应该返回原图片地址", () => {
    const imgSrc = "http://image.gif"

    expect(getNormalizedImage(32, imgSrc)).toBe(imgSrc)
    expect(getNormalizedImage(64, imgSrc)).toBe(imgSrc)
    expect(getNormalizedImage(120, imgSrc)).toBe(imgSrc)
    expect(getNormalizedImage(200, imgSrc)).toBe(imgSrc)
  })
  it("正确的图片类型，如果指定的 size 不被支持，应该返回原图片地址", () => {
    const jpgImgSrc = "http://image.jpg"
    const pngImgSrc = "http://image.png"
    const jpegImgSrc = "http://image.jpeg"

    expect(getNormalizedImage(42, jpgImgSrc)).toBe(jpgImgSrc)
    expect(getNormalizedImage(999, pngImgSrc)).toBe(pngImgSrc)
    expect(getNormalizedImage(-128, jpegImgSrc)).toBe(jpegImgSrc)
  })
  it("明确标识是 big, small, teamlogo 类型的图片，不应该生成指定的尺寸，返回原图片地址", () => {
    const jpgImgSrc = "http://image.big.jpg"
    const pngImgSrc = "http://image.small.png"
    const jpegImgSrc = "http://image.teamlogo.jpeg"

    expect(getNormalizedImage(42, jpgImgSrc)).toBe(jpgImgSrc)
    expect(getNormalizedImage(999, pngImgSrc)).toBe(pngImgSrc)
    expect(getNormalizedImage(-128, jpegImgSrc)).toBe(jpegImgSrc)
  })
  it("明确标识是 big, small, teamlogo 类型的图片，如果传入的是固定的尺寸，也应该返回原图片地址（不带尺寸）", () => {
    const jpgImgSrc = "http://image.big.jpg32.jpg"
    const pngImgSrc = "http://image.small.png64.png"
    const jpegImgSrc = "http://image.teamlogo.jpeg120.jpeg"

    expect(getNormalizedImage(32, jpgImgSrc)).toBe("http://image.big.jpg")
    expect(getNormalizedImage(999, pngImgSrc)).toBe("http://image.small.png")
    expect(getNormalizedImage(-128, jpegImgSrc)).toBe(
      "http://image.teamlogo.jpeg",
    )
  })
  it("正确类型的图片，请求指定的size，但传入的已经是正确尺寸的图片，能正确返回", () => {
    const imgSrc = "http://image.png32.png"

    expect(getNormalizedImage(32, imgSrc)).toBe(imgSrc)
  })
  it("正确类型的图片，请求指定的size，但传入的已经是其它尺寸的图片，能正确返回", () => {
    const imgSrc = "http://image.png32.png"

    expect(getNormalizedImage(64, imgSrc)).toBe(imgSrc.replace("32", "64"))
  })
  it("图片地址中含有size和类型，能正确返回", () => {
    const imgSrc = "http://image.png32.png.jpg"

    expect(getNormalizedImage(64, imgSrc)).toBe(imgSrc + "64.jpg")
    expect(getNormalizedImage(42, imgSrc)).toBe(imgSrc)
  })
})
