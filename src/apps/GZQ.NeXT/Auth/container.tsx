import * as r from "ramda"
import * as ra from "ramda-adjunct"
import React, { useState, useCallback } from "react"
import md5 from "js-md5"
import { useHistory } from "react-router-dom"

import { useSelector } from "react-redux"

import toaster from "~/utils/toaster"
import useFieldState from "~/hooks/useFieldState"
import storage from "~/utils/storage"
import { NAME } from "@/Entry/useConfig"

import auth from "./logic"
import { captchaUrl } from "./logic/config"
import { AuthInfo, UserOrgs } from "./types"
import View from "./view"

import { name } from "../config"

export default function Container(props: any) {
  const [account, setAccount] = useFieldState("ligyj@chanjet.com")
  const [password, setPassword] = useFieldState("temp123")
  const [captchaCode, setCaptchaCode, resetCaptchaCode] = useFieldState("")
  const [whileRequesting, setWhileRequesting] = useState(false)
  const [uuid, setUUID] = useState()
  const [random, setRandom_] = useState(Math.random)

  const history = useHistory()
  const setRandom = useCallback(() => setRandom_(Math.random), [])

  return (
    <View
      account={account}
      onAccountChange={setAccount}
      password={password}
      onPasswordChange={setPassword}
      onLogin={onLogin}
      captcha={!!uuid}
      captchaCode={captchaCode}
      onCaptchaCodeChange={setCaptchaCode}
      captchaImage={`${captchaUrl}${uuid}?r=${random}`}
      whileRequesting={whileRequesting}
      onRefreshCaptchaImage={setRandom}
    />
  )

  function onLogin() {
    if (whileRequesting) return

    if (r.any(ra.isEmptyString, [account, password])) {
      toaster.warning({ message: "用户名和密码都不允许为空！" })
      return
    }

    handleLogin({
      account,
      password,
      uuid,
      imageNo: uuid && captchaCode,
    })
  }

  function goHome(userOrg: UserOrgs) {
    storage
      .setItem(NAME, name)
      .then(() =>
        history.push(`/${name}/${userOrg.org.current}`, { replace: true }),
      )
  }

  function clearUUID(userOrg: UserOrgs) {
    setUUID(undefined)
    return userOrg
  }

  function handleLogin(authInfo: AuthInfo) {
    const encryptedPassword = md5(authInfo.password)

    setWhileRequesting(true)

    auth
      .login({ ...authInfo, password: encryptedPassword })
      .then(clearUUID)
      .then(welcome)
      .then(goHome)
      .catch((e: any) => {
        resetCaptchaCode()
        setWhileRequesting(false)

        if (e.uuid) setUUID(e.uuid)

        return Promise.reject(e)
      })
      .catch(toaster.warning)
  }
}

function welcome(userOrg: UserOrgs) {
  const name = r.pathOr("", ["user", "name"], userOrg)
  toaster.success({ message: `登录成功，欢迎 ${name}!` })
  return userOrg
}
