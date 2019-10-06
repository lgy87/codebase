import envs from "enums/envs"
const {NODE_ENV} = process.env

export default {
  current: NODE_ENV,
  isDev() {
    return NODE_ENV === envs.development
  },
  isProd() {
    return NODE_ENV === envs.production
  },
}
