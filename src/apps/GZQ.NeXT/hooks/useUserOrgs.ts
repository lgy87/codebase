import { useState, useEffect } from "react"

import {
  userStorage,
  orgsStorage,
  orgStorage,
} from "~/utils/userOrgInfoStorage"
import { UserOrgs, User, Orgs, Org } from "@/GZQ.NeXT/Auth/types"

export default function useConfigs() {
  const [userOrgs, setUserOrgs] = useState({} as UserOrgs)

  useEffect(() => {
    ;(async () => {
      try {
        const [user, orgs, org] = await Promise.all<User, Orgs, Org>([
          userStorage.getItem(),
          orgsStorage.getItem(),
          orgStorage.getItem(),
        ])
        setUserOrgs({ user, orgs, org } as UserOrgs)
      } catch {}
    })()
  }, [])

  return userOrgs
}
