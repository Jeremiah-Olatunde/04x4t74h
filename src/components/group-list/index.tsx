import type { PropsWithChildren } from "react"

export * as Control from "./control"
export * as Nav from "./nav"

export function Root({ children }: PropsWithChildren<{}>) {
  return <ul className="flex flex-col gap-8">{children}</ul>
}

export function Group({ children }: PropsWithChildren<{}>) {
  return <li>{children}</li>
}
