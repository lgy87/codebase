import {createLogger} from "redux-logger"
import env from "./envs"

export const middlewares = []

if (env.isDev) {
    middlewares.push(createLogger())
}

export default middlewares
