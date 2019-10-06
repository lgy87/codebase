import React, { FC, memo, ImgHTMLAttributes } from "react"

const Image: FC<ImgHTMLAttributes<HTMLImageElement>> = props => {
  return <img {...props} />
}

export default memo(Image)
