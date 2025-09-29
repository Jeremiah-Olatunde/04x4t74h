import type { PropsWithChildren } from "react"

import * as Header from "@/components/header"

type RootProps = { name: string; disabled?: boolean }
export function Root({
  name,
  children,
  disabled,
}: PropsWithChildren<RootProps>) {
  return (
    <fieldset name={name} className="contents" disabled={disabled}>
      <div className="min-w-0 w-full flex flex-col gap-6 grow-1">
        {children}
      </div>
    </fieldset>
  )
}

type FormGroupTitle = { description: string; title: string }

export function Title({
  children,
  description,
  title,
}: PropsWithChildren<FormGroupTitle>) {
  return (
    <div>
      <legend>
        <Header.Root>
          <Header.Title>{title}</Header.Title>
          <Header.Subtitle>{description}</Header.Subtitle>
          {children}
        </Header.Root>
      </legend>
    </div>
  )
}
