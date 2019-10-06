export const protocol        = "https"
export const hostname        = location.hostname
export const port            = location.port
export const origin          = __ORIGIN__ || location.origin
export const cspProxyUrl     = "/account/web/cspInterCall"
export const ciaUrl          = "http://cia.chanapp.chanjet.com/internal_api/authorizeByJsonp"
export const loginUrl        = "/account/web/user/login"
export const captchaUrl      = "/account/web/user/getKaptchaImage?uuid="
export const timeout         = 20 * 1000    // 20s
export const urlEncrpty      = ! isTestEnv()
export const ciaFirstOnLogin = ! isTestEnv()

export default {
  protocol,
  hostname,
  port,
  origin,
  cspProxyUrl,
  ciaUrl,
  loginUrl,
  captchaUrl,
  timeout,
  urlEncrpty,
  ciaFirstOnLogin,
}

function isTestEnv() {
  return __ENVS__.test === origin
}
