import { ChevronRightIcon } from "lucide-react"
import type { PropsWithChildren } from "react"

export function Root({ children }: PropsWithChildren<{}>) {
  return (
    <div className="bg-neutral-50 rounded-s-full rounded-e-full py-1 px-2 w-min flex gap-1 items-center justify-center">
      {children}
    </div>
  )
}

type CrumbProps = { children: string }
export function Crumb({ children }: CrumbProps) {
  return (
    <div className="font-sora text-xs font-semibold text-neutral-400">
      {children}
    </div>
  )
}

type DividerProps = {}
export function Divider({}: DividerProps) {
  return <ChevronRightIcon className="font-sora text-neutral-400 size-4" />
}
