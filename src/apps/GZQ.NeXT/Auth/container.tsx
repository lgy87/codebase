import * as r from "ramda"
import * as ra from "ramda-adjunct"
import React, { useState, useCallback } from "react"
import md5 from "js-md5"
import { useHistory } from "react-router-dom"

import { useDispatch } from "react-redux"

import {
  userStorage,
  orgsStorage,
  orgStorage,
} from "~/utils/userOrgInfoStorage"
import toaster from "~/utils/toaster"
import useFieldState from "~/hooks/useFieldState"
import useStoredUserOrgs from "~/apps/GZQ.NeXT/hooks/useStoredUserOrgs"

import { setOrg, setOrgs, setUser } from "../actions"
import { name } from "../config"

import auth from "./logic"
import { captchaUrl } from "./logic/config"
import { AuthInfo, UserOrgs, User, OrgItem, StoredUserOrgs } from "./types"
import View from "./view"

export default function Container() {
  const [account, setAccount] = useFieldState("ligyj@chanjet.com")
  const [password, setPassword] = useFieldState("temp123")
  const [captchaCode, setCaptchaCode, resetCaptchaCode] = useFieldState("")
  const [whileRequesting, setWhileRequesting] = useState(false)
  const [uuid, setUUID] = useState()
  const [random, setRandom_] = useState(Math.random)

  const { user, org } = useStoredUserOrgs()

  const history = useHistory()
  const dispatch = useDispatch()
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

  function goHome(storedUserOrg: StoredUserOrgs) {
    history.push(`/${name}/${storedUserOrg.org.current}`, { replace: true })
  }

  function clearUUID(storedUserOrg: StoredUserOrgs) {
    setUUID(undefined)
    return storedUserOrg
  }

  function updateStore(storedUserOrg: StoredUserOrgs) {
    const { user, orgs, org } = storedUserOrg

    if (r.isEmpty(user)) return storedUserOrg

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const indexByID = r.indexBy(r.prop<Orgs>("id"))

    dispatch(setUser(user))
    dispatch(setOrgs(indexByID(orgs)))
    dispatch(setOrg(org))

    return storedUserOrg
  }

  function handleLogin(authInfo: AuthInfo) {
    const encryptedPassword = md5(authInfo.password)

    setWhileRequesting(true)

    auth
      .login({ ...authInfo, password: encryptedPassword })
      .then(clearUUID)
      .then(welcome)
      .then(presistUserOrgs)
      .then(updateStore)
      .then(goHome)
      .catch((e: any) => {
        resetCaptchaCode()
        setWhileRequesting(false)

        if (e.uuid) setUUID(e.uuid)
        return Promise.reject(e)
      })
      .catch(toaster.warning)
  }

  async function presistUserOrgs(storedUserOrg: StoredUserOrgs) {
    const { user: newUser, orgs: newOrgs, org: newOrg } = storedUserOrg

    // 如果是本次登录和上次登录为同一user，使用缓存中的信息
    // 这样可以保存上次用户退出时所在的企业
    const availableOrg = isSameUser(user, newUser) ? org : newOrg

    await Promise.all([
      userStorage.setItem(newUser),
      orgsStorage.setItem(newOrgs),
      orgStorage.setItem(availableOrg),
    ])

    return { user: newUser, orgs: newOrgs, org: availableOrg } as StoredUserOrgs
  }
}

function welcome(storedUserOrg: StoredUserOrgs) {
  const name = r.pathOr("", ["user", "name"], storedUserOrg)
  toaster.success({ message: `登录成功，欢迎 ${name}!` })
  return storedUserOrg
}

const isSameUser = r.eqProps("id")
