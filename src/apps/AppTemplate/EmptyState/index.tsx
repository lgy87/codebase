/*
 * Guangyao Li
 * 2019/07/04
 * lgy87@foxmail.com
 */
import React, { memo, FC } from "react"

import { Flex, Box } from "reflexbox"
import logo from "./logo.png"
import style from "./style.module.scss"

const EmptyState: FC<{}> = () => {
  return (
    <Flex className="height100" justifyContent="center" alignItems="center">
      <Box>
        <img src={logo} className={style.placeholder} />
      </Box>
    </Flex>
  )
}

export default memo(EmptyState)
