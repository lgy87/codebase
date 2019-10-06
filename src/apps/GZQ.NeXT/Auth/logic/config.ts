export const loginStateUrl =
  "https://cia.chanapp.chanjet.com/internal_api/authorizeByJsonp"
export const captchaUrl = "/account/web/user/getKaptchaImage?uuid="
export const gzqLoginUrl = "/account/web/user/login"
// 注册到GZQ的url (已登录到CIA，但是没有登录GZQ时，调用该接口)
export const gzqRegisterUrl = "/web/sso/authForWeb"
export const gzqLogoutUrl = "/account/web/user/logout"
export const cspProxyUrl = "/account/web/cspInterCall"

export const errorCodes = {
  LOGIN_GZQ_FAILED: "9908",
  LOGIN_GZQ_CAPTCHA: "3006",
}
