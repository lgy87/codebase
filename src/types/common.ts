export type AnyFn = (args?: any) => any

export type Response<T = any> = {
  code: number
  data?: T
  msg?: string
}
