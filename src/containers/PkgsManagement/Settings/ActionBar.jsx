import { Button, ButtonGroup } from "@blueprintjs/core"

// import mapPropTypes_ from "@/utils/mapPropTypes_"
import RemoveAction from "./RemoveAction"

function ActionBar(props) {
  return (
    <ButtonGroup>
      <Button icon="refresh" text="Restore" />
      <Button icon="plus" text="Add" onClick={props.handleAdd} />
      <Button icon="edit" text="Edit" onConfirm={props.handleEdit} />
      <RemoveAction action={props.handleRemove} />
      <Button icon="selection" text="Select" onClick={props.handleSelect} />
    </ButtonGroup>
  )
}

ActionBar.propTypes = {
  handleRefresh: "func.",
  handleAdd: "func.",
  handleEdit: "func.",
  handleRemove: "func.",
  handleSelect: "func.",
}

export default ActionBar
