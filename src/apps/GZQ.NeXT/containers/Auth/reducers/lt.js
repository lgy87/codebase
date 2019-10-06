/*
 * Guangyao Li
 * 2017/09/11
 * 759646703@qq.com
 */
import {handleActions} from "redux-actions"
import actions from "../actions"

const initialState = ""
export default handleActions({
  [actions.lt]: (state, action) => action.payload,
}, initialState)
