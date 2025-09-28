import { type PropsWithChildren } from "react"
import { Fieldset } from "@base-ui-components/react/fieldset"

export * as Skeleton from "./skeleton"

export function Root({ children }: PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center justify-between">{children}</div>
  )
}

export function Title({ children }: PropsWithChildren<{}>) {
  return (
    <Fieldset.Legend>
      <div className="capitalize font-sora text-sm font-medium text-neutral-600">
        {children}
      </div>
    </Fieldset.Legend>
  )
}

export function Clear({ handleClick }: { handleClick: () => void }) {
  return (
    <button
      type="button"
      className="font-sora text-neutral-400 text-xs font-medium"
      onClick={handleClick}
    >
      Clear
    </button>
  )
}
