import {
  ArrowUpAZIcon,
  FunnelPlusIcon,
  ListFilterIcon,
  XIcon,
} from "lucide-react"

import * as Clickable from "@/components/clickable"
import type { PropsWithChildren } from "react"

type ControlsProps = {}
export function Root({ children }: PropsWithChildren<ControlsProps>) {
  return (
    <div className="flex flex-col justify-center items-stretch gap-1">
      {children}
    </div>
  )
}

type SortProps = { href: string }
export function Sort({ href }: SortProps) {
  return (
    <Clickable.Badge as="link" href={href} size="sm" color="white">
      <span>Sort</span>
      <ArrowUpAZIcon className="size-3" />
    </Clickable.Badge>
  )
}

type FiltersProps = { href: string }
export function Filters({ href }: FiltersProps) {
  return (
    <Clickable.Badge as="link" href={href} size="sm" color="purple">
      <span>Filters</span>
      <ListFilterIcon className="size-3" />
    </Clickable.Badge>
  )
}

type ApplyProps = { href: string }
export function Apply({ href }: ApplyProps) {
  return (
    <Clickable.Badge as="link" href={href} size="sm" color="purple">
      <span>Apply</span>
      <FunnelPlusIcon className="size-3" />
    </Clickable.Badge>
  )
}

type ResetProps = { href: string }
export function Reset({ ...props }: ResetProps) {
  return (
    <Clickable.Badge as="link" {...props} replace={true} size="sm" color="red">
      <span>Reset</span>
      <XIcon className="size-4" />
    </Clickable.Badge>
  )
}
