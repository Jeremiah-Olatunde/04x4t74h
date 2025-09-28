import type { PropsWithChildren } from "react"
import { Link as LinkWouter } from "wouter"

export * as Field from "./field"
export * as Header from "./header"
export * as Skeleton from "./skeleton"

type FormProps = {}
export function Form({ children }: PropsWithChildren<FormProps>) {
  return <form className="p-6 flex flex-col gap-8">{children}</form>
}

type ResetProps = { href: string }
export function Reset({ href }: ResetProps) {
  return (
    <LinkWouter
      href={href}
      className="text-center font-sora font-medium text-sm text-red-500 bg-red-100 p-3 rounded-xl"
    >
      Reset
    </LinkWouter>
  )
}
