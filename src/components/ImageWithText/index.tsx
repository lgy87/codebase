import React, { FC, memo, CSSProperties, ReactNode } from "react"

import Image from "~/components/Image"

type Props = {
  src: string
  text: ReactNode
  className?: string
  style?: CSSProperties
  imageStyle?: CSSProperties
  textStyle?: CSSProperties
}

const ImageWithText: FC<Props> = props => {
  return (
    <div style={props.style} className={props.className}>
      <Image src={props.src} style={createImageStyle(props.imageStyle)} />
      <span style={createTextStyle(props.textStyle)}>{props.text}</span>
    </div>
  )
}

export default memo(ImageWithText)

const createImageStyle = (imageStyle?: CSSProperties) => ({
  width: "32px",
  borderRadius: "50%",
  verticalAlign: "middle",
  ...imageStyle,
})

const createTextStyle = (textStyle?: CSSProperties) => ({
  paddingLeft: "8px",
  ...textStyle,
})
