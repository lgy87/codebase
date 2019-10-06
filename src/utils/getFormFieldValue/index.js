import * as r from "ramda"

export default function getFormFieldValue({ target = {} } = {}) {
  const field = target.getAttribute(DATA_FIELD)

  const value = getInputValue(target)
  return r.objOf(field, value)
}

const getInputValue = target => {
  const { value, checked, type } = target
  return isSwitchable(type) ? checked : value
}

const DATA_FIELD = "data-field"
const isRadio = r.equals("radio")
const isCheckbox = r.equals("checkbox")
const isSwitchable = r.anyPass([isRadio, isCheckbox])
