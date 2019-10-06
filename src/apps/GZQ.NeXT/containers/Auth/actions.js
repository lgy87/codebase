/*
 * Guangyao Li
 * 2017/03/22
 * 759646703@qq.com
 */
import {createActions} from "redux-actions"

export default createActions(
  "LOGIN",
  "LOGIN_REQUEST",
  "LOGIN_SUCCESSFULLY",
  "LOGIN_FAILED",
  "LOGOUT",
  "CAPTCHA",
  "USER_INFO",
  "ORGS_INFO",
  "LT",
  "DEFAULT_ORG_ID",
)
