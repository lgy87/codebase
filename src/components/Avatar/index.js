import React, { memo, useState } from "react"
import * as r from "ramda"

import ImageWithText from "~/components/ImageWithText"
import getAvatar from "~/utils/getAvatar"
import config from "./config"

const Avatar = props => {
  const imgSrc = getAvatar(props.avatar)

  return (
    <ImageWithText
      style={style}
      src={imgSrc}
      imageStyle={imageStyle}
      text={props.name}
      textStyle={textStyle}
    />
  )
}

export default memo(Avatar)

function createPropTypes() {
  return {
    avatar: "string.",
    name: "string.",
  }
}

const style = {
  color: "white",
}
const imageStyle = {
  borderRadius: "25%",
  verticalAlign: "middle",
}
const textStyle = {
  paddingLeft: "10px",
}
const iconStyle = {
  paddingLeft: "2px",
}
