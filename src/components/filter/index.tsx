import type { PropsWithChildren } from "react"

export * as Field from "./field"
export * as Skeleton from "./skeleton"

type FormProps = {}
export function Form({ children }: PropsWithChildren<FormProps>) {
  return <form className="p-6 flex flex-col gap-8">{children}</form>
}
