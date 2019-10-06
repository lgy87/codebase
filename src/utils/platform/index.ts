import * as r from "ramda"
import { loadJs } from "~/utils/loader"

const platforms = {
  sunflower: /sunflower/i,
  wechat: /MicroMessenger/i,
  chanjet: /chanjet/i,
  qiandaola: /qiandaola/i,
  qq: /qq/i,
}

export type Platform = Readonly<{
  sunflower: boolean
  wechat: boolean
  chanjet: boolean
  qiandaola: boolean
  qq: boolean
  wechatMiniProgram: Promise<boolean>
}>

export function factory(ua: string): Platform {
  const test = (re: RegExp) => re.test(ua)

  const sunflower = test(platforms.sunflower)
  const wechat = test(platforms.wechat)
  const chanjet = test(platforms.chanjet)
  const qiandaola = test(platforms.qiandaola)
  const qq = test(platforms.qq)

  const wechatMiniProgram = new Promise<boolean>(resolve => {
    if (!wechat) resolve(false)

    const wechatSdkUrl = "https://res.wx.qq.com/open/js/jweixin-1.3.2.js"
    loadJs(wechatSdkUrl)
      .then(() =>
        // @ts-ignore
        wx.miniProgram.getenv(
          r.pipe(
            // @ts-ignore
            r.prop("miniprogram"),
            resolve,
          ),
        ),
      )
      .catch(() => resolve(false))
  })

  return {
    sunflower,
    wechat,
    chanjet,
    qiandaola,
    qq,
    wechatMiniProgram,
  }
}

export default factory(window.navigator.userAgent)
