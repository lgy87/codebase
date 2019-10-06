import React, { FC } from "react"
import { ControlGroup } from "@blueprintjs/core"

import Image from "~/components/Image"

import createField from "./createField"

const CaptchaInput = createField({
  leftIcon: "media",
  placeholder: "验证码",
  type: "text",
  "data-field": "captchaCode",
})

const Captcha: FC<any> = (props: any) => {
  return (
    <ControlGroup fill={true} vertical={false}>
      <CaptchaInput placeholder="Find filters..." />
      <Image src={props.image} />
    </ControlGroup>
  )
}

export default Captcha
