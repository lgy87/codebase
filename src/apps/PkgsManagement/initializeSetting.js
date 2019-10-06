import * as r from "ramda"
import * as ra from "ramda-adjunct"
import { useEffect } from "react"

import storage from "~/utils/storage"

import { sources, clients, storageKeys } from "./config"

export default async function initializeSettingIfNeeded() {
  return storage
    .getItem(storageKeys.setting)
    .then(ra.isFalsy)
    .then(r.when(ra.isTruthy, defaultSetting))
}

export async function resetSetting() {
  return clearSetting().then(initializeSettingIfNeeded)
}

async function defaultSetting() {
  const saveSetting = storage.setItem(storageKeys.setting, true)
  const saveSettingSources = storage.setItem(storageKeys.settingSources, [
    sources,
    sources,
  ])

  return Promise.all([saveSetting, saveSettingSources])
}

async function clearSetting() {
  return await r.map(storage.removeItem, storageKeys)
}
