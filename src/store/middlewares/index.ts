import { Middleware } from "redux"
import thunk from "redux-thunk"
import mode from "@bit/lgy87.utils.mode"

import logger from "./logger"

const middlewares: Array<Middleware> = [thunk]

if (mode.isNotProd) middlewares.push(logger)

export default middlewares
