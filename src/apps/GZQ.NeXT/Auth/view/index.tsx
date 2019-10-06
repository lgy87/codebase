import React, { memo } from "react"
import { FormGroup, ControlGroup } from "@blueprintjs/core"

import Account from "./Account"
import Password from "./Password"
import Captcha from "./Captcha"
import LoginButton from "./LoginButton"

const Auth = (props: any) => (
  <FormGroup>
    <ControlGroup vertical>
      <Account value={props.account} onChange={props.onAccountChange} />
      <Password value={props.password} onChange={props.onPasswordChange} />
      {props.captcha && (
        <Captcha
          image={props.captchaImage}
          value={props.captchaCode}
          onChange={props.onCaptchaCodeChange}
          refreshImage={props.onRefreshCaptchaImage}
        />
      )}
      <LoginButton onClick={props.onLogin} logining={props.whileRequesting} />
    </ControlGroup>
  </FormGroup>
)

export default memo(Auth)

function createPropTypes() {
  return {
    user: "string.",
    onUserChange: "func.",
    password: "string.",
    onPasswordChange: "func.",
    onLogin: "func.",
    whileRequesting: "bool",
  }
}
