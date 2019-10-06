import React from "react"
import { Button, Intent } from "@blueprintjs/core"

type Props = {
  onClick: () => void
  logining: boolean
}

const LoginButton: React.FC<Props> = props => {
  return (
    <Button
      intent={Intent.SUCCESS}
      onClick={props.onClick}
      loading={props.logining}
    >
      登录
    </Button>
  )
}
export default LoginButton
