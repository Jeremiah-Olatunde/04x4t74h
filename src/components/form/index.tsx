import type { ComponentProps, PropsWithChildren } from "react"

export * as Banner from "./banner"
export * as Button from "./button"
export * as Control from "./input"
export * as Field from "./field"
export * as Group from "./group"

type RootProps = {} & ComponentProps<"form">
export function Root({ children, ...props }: PropsWithChildren<RootProps>) {
  return <form {...props}>{children}</form>
}
