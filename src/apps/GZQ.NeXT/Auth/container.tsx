import * as r from "ramda"
import React, { useState } from "react"
import md5 from "js-md5"

import toaster from "~/utils/toaster"
import auth from "./logic"
import { captchaUrl } from "./logic/config"
import { AuthInfo, UserOrgs } from "./logic/types"
// import useFieldState from "~/hooks/useFieldState"
import { useHistory } from "react-router-dom"
import View from "./view"

export default function Container(props: any) {
  const account = React.useRef("ligyj@chanjet.com2")
  const password = React.useRef("temp123")
  const [whileRequesting, setWhileRequesting] = useState(false)
  const [uuid, setUUID] = useState("")
  const history = useHistory()

  const setAccount = React.useCallback(value => (account.current = value), [])
  const setPassword = React.useCallback(value => (password.current = value), [])

  return (
    <View
      account={account.current}
      onAccountChange={setAccount}
      password={password.current}
      onPasswordChange={setPassword}
      onLogin={onLogin}
      captchaImage={captchaUrl + uuid}
      whileRequesting={whileRequesting}
    />
  )

  function onLogin() {
    if (whileRequesting) return

    handleLogin({
      account: account.current,
      password: password.current,
    })
  }

  function goHome() {
    history.push("/", { replace: true })
  }

  function handleLogin({ account, password }: AuthInfo) {
    const encryptedPassword = md5(password)

    setWhileRequesting(true)

    auth
      .login({ account, password: encryptedPassword })
      .then(welcome)
      .then(goHome)
      .catch((e: any) => {
        if (e.uuid) setUUID(e.uuid)
      })
      .catch(toaster.error)
      .finally(() => setWhileRequesting(false))
  }
}

function welcome(userOrg: UserOrgs) {
  const name = r.pathOr("", ["user", "name"], userOrg)
  toaster.success({ message: `登录成功，欢迎 ${name}!` })
}
