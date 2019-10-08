import { ReactNode } from "react"

type AppHeaderChildrenType = ReactNode
type AppSidebarChildrenType = ReactNode
type AppContentChildrenType = ReactNode
type AppEmptyStateChildrenType = ReactNode | undefined

export type AppHeaderProps = {
  children: AppHeaderChildrenType
}
export type AppSidebarProps = AppHeaderProps
export type AppContentProps = AppHeaderProps
export type AppEmptyStateProps = {
  children: AppEmptyStateChildrenType
}

export type AppTemplateProps = {
  children: [
    AppHeaderChildrenType,
    AppSidebarChildrenType,
    AppContentChildrenType,
    AppEmptyStateChildrenType,
  ]
}
