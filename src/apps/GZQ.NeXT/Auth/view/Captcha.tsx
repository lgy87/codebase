import React, { FC } from "react"
import { ControlGroup } from "@blueprintjs/core"

import Image from "~/components/Image"

import createField from "./createField"
import styles from "./style.module.scss"

const CaptchaInput = createField({
  leftIcon: "media",
  placeholder: "验证码",
  type: "text",
  "data-field": "captchaCode",
})

const Captcha: FC<any> = (props: any) => {
  return (
    <ControlGroup fill={true} vertical={false}>
      <CaptchaInput
        placeholder="请输入验证码"
        onChange={props.onChange}
        value={props.value}
      />
      <Image
        src={props.image}
        className={styles.captcha}
        onDoubleClick={props.refreshImage}
      />
    </ControlGroup>
  )
}

export default Captcha
