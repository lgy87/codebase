import { useState, useEffect } from "react"

import userOrgInfoStorage from "~/utils/userOrgInfoStorage"
import { UserOrgs } from "@/GZQ.NeXT/Auth/types"

export default function useConfigs() {
  const [userOrgs, setUserOrgs] = useState({} as UserOrgs)

  useEffect(() => {
    ;(async () => {
      try {
        const userOrgs = await userOrgInfoStorage.getItem()
        setUserOrgs(userOrgs)
      } catch {}
    })()
  }, [])

  return userOrgs
}
