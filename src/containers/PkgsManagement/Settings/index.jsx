import * as ra from "ramda-adjunct"
import * as r from "ramda"
import React, { memo, useState, useEffect } from "react"
import {
  HTMLTable,
  Colors,
  FormGroup,
  ControlGroup,
  ButtonGroup,
  Button,
  Alert,
  InputGroup,
  Label,
  Intent,
} from "@blueprintjs/core"

import useFieldState from "@/hooks/useFieldState"
import storage from "@/utils/storage"
import { clients, storageKeys } from "./config"
import ActionBar from "./ActionBar"

export default function Setting() {
  const [sources, setSources] = useState([[], []])
  const [activeClientIndex, setActiveClientIndex] = useState(-1)
  const [activeSourceIndexes, setActiveSourceIndexes] = useState([-1, -1])
  const [selectedIndexes, setSelectedIndexes] = useState([-1, -1])
  const [name, setName, resetName] = useFieldState("")
  const [url, setUrl, resetUrl] = useFieldState("")
  const [alertVisible, setAlertVisible] = useState(false)

  useEffect(() => {
    Promise.all([
      storage.getItem(storageKeys.settingActiveClientIndex),
      storage.getItem(storageKeys.settingActiveSourceIndexes),
      storage.getItem(storageKeys.settingSources),
    ]).then(([clientIndex, sourceIndexes, sources]) => {
      setActiveClientIndex(clientIndex || 0)
      setActiveSourceIndexes(sourceIndexes || [-1, -1])
      setSources(sources)
    })
  }, [])

  useEffect(
    () => {
      storage.setItem(storageKeys.settingActiveClientIndex, activeClientIndex)
    },
    [activeClientIndex],
  )

  useEffect(
    () => {
      storage.setItem(
        storageKeys.settingActiveSourceIndexes,
        activeSourceIndexes,
      )
    },
    [activeSourceIndexes],
  )

  useEffect(
    () => {
      storage.setItem(storageKeys.settingSources, sources)
    },
    [sources],
  )

  return (
    <>
      <Switch
        items={clients}
        activeIndex={activeClientIndex}
        setActiveIndex={setActiveClientIndex}
      />
      <ActionBar
        handleRemove={removeSource}
        handleSelect={updateActiveSourceIndex}
        handleAdd={prepareToAddSource}
        handleEdit={prepareToEditSource}
        handleRestore={ra.noop}
      />
      <HTMLTable bordered interactive css={style}>
        <tbody>
          <TableRows
            items={getSource()}
            activeIndex={activeSourceIndexes[activeClientIndex]}
            selectedIndex={getSelectedIndex()}
            updateSelectedIndexes={updateSelectedIndexes}
          />
        </tbody>
      </HTMLTable>
      <Alert
        confirmButtonText="确定"
        cancelButtonText="取消"
        isOpen={alertVisible}
        intent={Intent.SUCCESS}
        canOutsideClickCancel={true}
        onCancel={closeDialog}
        onConfirm={addSource}
      >
        <AddDialog name={name} setName={setName} url={url} setUrl={setUrl} />
      </Alert>
    </>
  )
  function updateSelectedIndexes(index) {
    const newIndexes = r.update(activeClientIndex, index, selectedIndexes)
    setSelectedIndexes(newIndexes)
  }
  function updateActiveSourceIndex() {
    const newIndexes = r.update(
      activeClientIndex,
      selectedIndexes[activeClientIndex],
      activeSourceIndexes,
    )
    console.log(newIndexes)
    setActiveSourceIndexes(newIndexes)
  }
  function getSource() {
    return sources[activeClientIndex] || []
  }
  function getSelectedIndex() {
    return selectedIndexes[activeClientIndex]
  }
  function removeSource() {
    const newSources = r.dissocPath(
      [activeClientIndex, getSelectedIndex()],
      sources,
    )
    setSources(newSources)
  }
  function showDialog() {
    setAlertVisible(true)
  }
  function closeDialog() {
    setAlertVisible(false)
  }
  function prepareToAddSource() {
    resetName()
    resetUrl()
    showDialog()
  }
  function addSource() {
    const lens = r.lensIndex(activeClientIndex)

    const newSources = r.over(
      lens,
      r.insert(getSelectedIndex(), { name, url }),
      sources,
    )
    setSources(newSources)
    closeDialog()
  }
}

function prepareToEditSource() {
  const source = getSource()
  const selected = source[getselectedIndex()]
  setName(selected.name)
  setUrl(selected.url)

  showDialog()
}

function Field({ label, ...rest }) {
  return (
    <Label>
      {label}
      <InputGroup {...rest} />
    </Label>
  )
}
function AddDialog(props) {
  return (
    <FormGroup style={{ width: "360px" }}>
      <ControlGroup vertical>
        <Field
          label="名称"
          data-field="name"
          value={props.name}
          onChange={props.setName}
        />
        <Field
          label="URL"
          data-field="url"
          value={props.url}
          onChange={props.setUrl}
        />
      </ControlGroup>
    </FormGroup>
  )
}
function Switch({ items, activeIndex, setActiveIndex = ra.noop }) {
  return (
    <ButtonGroup css={switchStyle}>
      {items.map((item, index) => (
        <Button
          key={index}
          {...item}
          active={activeIndex === index}
          onClick={() => setActiveIndex(index)}
        />
      ))}
    </ButtonGroup>
  )
}

function TableRows(props) {
  return props.items.map((row, index) => (
    <TableRow
      updateSelectedIndexes={props.updateSelectedIndexes}
      selected={props.selectedIndex === index}
      active={index === props.activeIndex}
      index={index}
      key={index}
      {...row}
    />
  ))
}

function TableRow(props) {
  return (
    <tr
      onClick={() => props.updateSelectedIndexes(props.index)}
      css={props.selected && selectedStyle}
    >
      <td css={starStyle}>{props.active && "*"} </td>
      <td>{props.name}</td>
      <td>{props.url}</td>
    </tr>
  )
}

const style = {
  border: "1px solid " + Colors.LIGHT_GRAY2,
  borderTop: 0,
  marginTop: "10px",
}

const switchStyle = {
  marginRight: "10px",
}

const starStyle = {
  color: Colors.RED2 + "!important",
}

const selectedStyle = {
  backgroundColor: Colors.LIGHT_GRAY4,
}
