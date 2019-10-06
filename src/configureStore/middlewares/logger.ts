import { createLogger } from "redux-logger"

export default createLogger({
  collapsed: false,
  diff: true,
  duration: true,
  timestamp: true,
  level: "log",
})
