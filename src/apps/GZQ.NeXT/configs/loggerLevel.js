import env from "./envs"
import levels from "enums/loggerLevels"

const defaults = {
  [env.development]: levels.info,
  [env.production] : levels.error,
}

export default defaults[env.current] || levels.error

