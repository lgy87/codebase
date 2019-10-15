import { useState, useEffect } from "react"

import {
  userStorage,
  orgsStorage,
  orgStorage,
} from "~/utils/userOrgInfoStorage"
import { UserOrgs } from "@/GZQ.NeXT/Auth/types"

export default function useConfigs() {
  const [userOrgs, setUserOrgs] = useState({} as UserOrgs)

  useEffect(() => {
    ;(async () => {
      try {
        const [user, orgs, org] = await Promise.all([
          userStorage.getItem(),
          orgsStorage.getItem(),
          orgStorage.getItem(),
        ])
        setUserOrgs({ user, orgs, org })
      } catch {}
    })()
  }, [])

  return userOrgs
}
