import React from "react"
import { FormGroup, ControlGroup } from "@blueprintjs/core"
import * as r from "ramda"

import Account from "./Account"
import Password from "./Password"
import LoginButton from "./LoginButton"

const Auth = (props: any) => (
  <FormGroup>
    <ControlGroup vertical>
      <Account value={props.account} onChange={props.onAccountChange} />
      <Password value={props.password} onChange={props.onPasswordChange} />
      <LoginButton onClick={props.onLogin} logining={props.whileRequesting} />
    </ControlGroup>
  </FormGroup>
)

export default r.pipe(
  React.memo,
  // addPropTypesTo_(createPropTypes()),
)(Auth)

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
