import { Button } from "@blueprintjs/core"
import * as ra from "ramda-adjunct"

import Popconfirm from "@/components/Popconfirm"
// import mapPropTypes_ from "@/utils/mapPropTypes_"

function RemoveAction({ action = ra.noop }) {
  return (
    <Popconfirm
      title="确认删除？"
      cancelButtonText="我再想想"
      confirmButtonText="删除吧!"
      onConfirm={action}
    >
      <Button icon="trash" text="Remove" />
    </Popconfirm>
  )
}
RemoveAction.propTypes = {
  action: "func",
}

export default RemoveAction
