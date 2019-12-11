import React, { FC } from "react"
import { shallow } from "enzyme"

import useCountDown from "./index"

type Props = {
  from: number
  to: number
}

const CountDown: FC<Props> = ({ from, to }) => {
  const { current, reset, resume, pause } = useCountDown(from, to)

  return (
    <>
      <span className="current">{current}</span>
      <span className="pause"></span>
    </>
  )
}
describe("useCountDown", () => {
  it("aaa", () => {
    expect(1).toBe(1)
  })
})
