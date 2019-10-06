export type AnyFn = (args?: any) => any

export type Response<T> = {
  code: number
  data?: T
  msg?: string
}
