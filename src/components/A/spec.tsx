import React from "react"
import { shallow } from "enzyme"
import A, { TARGET_BLANK, SECURITY_REL } from "./index"

describe("A", () => {
  it("可以正常渲染出来a标签", () => {
    const a = shallow(<A />)

    expect(a.find("a")).toHaveLength(1)
    expect(a.prop("rel")).toBeUndefined()
    expect(a.prop("onClick")).toBeUndefined()
  })

  it("能够支持指定属性", () => {
    const rel = "this-is-a-rel-value"
    const callback = jest.fn()

    const a = shallow(<A rel={rel} onClick={callback} />)

    expect(a.prop("rel")).toBe(rel)
    expect(typeof a.prop("onClick")).toBe("function")

    a.simulate("click")
    expect(callback).toHaveBeenCalledTimes(1)
  })
  it("指定target为_blank时，rel属性应该会自动加上noopener noreferrer", () => {
    const a = shallow(<A target={TARGET_BLANK} />)
    expect(a.prop("rel")).toBe(SECURITY_REL)

    const rel = "this-is-a-rel-value"
    const aWithRel = shallow(<A rel={rel} target={TARGET_BLANK} />)
    expect(aWithRel.prop("rel")).toBe(rel + " " + SECURITY_REL)
  })
})
