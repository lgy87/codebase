/*
 * Guangyao Li
 * 2017/08/18
 * 759646703@qq.com
 */
import actions from './actions'
import {
  ciaUrl,
  ciaFirstOnLogin,
  loginUrl,
  captchaUrl,
} from 'configs/network'
import get from 'lodash/fp/get'
import {take, call, takeEvery} from "redux-saga/effects"
import request from "utils/request"
import dataSource from "utils/dataSource"
import put from "utils/put"
import keyBy from "lodash/fp/keyBy"

const keyById = keyBy("id")

function * authorize ({payload: authInfo}) {
  try {
    yield put(actions.loginRequest)

    const code = yield call(cia)
    const result = yield call(loginWith(authInfo), code)
    yield put(actions.loginSuccessfully)

    const {user} = result
    yield put(actions.userInfo, user)

    const keyedOrgs = keyById(result.orgs)
    yield put(actions.orgsInfo, keyedOrgs)

    yield put(actions.lt, result.lt)
    yield put(actions.defaultOrgId, result.defaultOrgId)
  } catch (e) {
    const uuid = get("result.uuid")(e)
    yield uuid
      ? put(actions.captcha, {uuid, randomNum: Math.random()})
      : put(actions.loginFailed, e)
  }
}

export default function * loginFlow () {
  yield takeEvery(String(actions.login), authorize)
}

function cia () {
  if (! ciaFirstOnLogin) {
    return Promise.resolve({})
  }

  return dataSource.cia({
    type: "get",
    dataType: "jsonp",
    data: {
      client_id: "teamplusapp",
      state: "gzq",
    },
  })
}

function loginWith(authInfo) {
  const data = {
    deviceType: "WEB",
    clientVersion: "2.0",
    ...authInfo,
  }

  return function login(resp) {
    if (resp.code || resp.auth_code) {
      data.code     = resp.code,
      data.authCode = resp.auth_code
    }

    return dataSource.login({
      method: "post",
      data,
    })
  }
}
