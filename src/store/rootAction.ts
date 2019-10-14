import { ActionType } from "typesafe-actions"

import * as configs from "@/Entry/actions"

const actions = {
  configs,
}

export type RootAction = ActionType<typeof actions>
