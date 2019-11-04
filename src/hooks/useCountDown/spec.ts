/*
 * Guangyao Li
 * 2019/11/04
 * lgy87@foxmail.com
 */
import { renderHook, act } from "@testing-library/react-hooks"
import useCountDown from "./index"

describe("useCountDown", () => {
  it("xxx", () => {
    const { result } = renderHook(() => useCountDown(1, 5))

    expect(result.current.current).toBe(5)
  })
})
