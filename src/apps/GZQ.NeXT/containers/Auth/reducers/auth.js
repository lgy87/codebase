/*
 * Guangyao Li
 * 2017/04/02
 * 759646703@qq.com
 */
import {handleActions} from "redux-actions"
import authState from "enums/authState"
import actions from "../actions"
import pick from "lodash/fp/pick"
import assign from "lodash/fp/assign"

const initialState = {
  status: authState.loggedOut,
}

export default handleActions({
  [actions.login]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
  [actions.loginRequest]: (state, action) => ({
    ...state,
    status: authState.logging,
  }),
  [actions.loginSuccessfully]: (state, action) => {
    const {password, ...rest} = state
    return {
      ...rest,
      status: authState.loggedIn,
    }
  },
  [actions.logout]: _ => initialState,
  [actions.captcha]: (state, action) => ({
    ...state,
    ...action.payload,
    captchaCode: "",
  }),
}, initialState)

