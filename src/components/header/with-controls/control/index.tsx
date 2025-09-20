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
    <div className="flex flex-col justify-center items-center gap-1">
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

type LinkFilterProps = { href: string }
export function Filter({ href }: LinkFilterProps) {
  return (
    <Clickable.Badge as="link" href={href} size="sm" color="purple">
      <span>Filter</span>
      <ListFilterIcon className="size-3" />
    </Clickable.Badge>
  )
}

type LinkApplyProps = { href: string }
export function Apply({ href }: LinkApplyProps) {
  return (
    <Clickable.Badge as="link" href={href} size="sm" color="purple">
      <span>Apply</span>
      <FunnelPlusIcon className="size-3" />
    </Clickable.Badge>
  )
}

type ButtonResetProps = { href: string }
export function Reset({ ...props }: ButtonResetProps) {
  return (
    <Clickable.Badge as="link" {...props} size="sm" color="red">
      <span>Reset</span>
      <XIcon className="size-4" />
    </Clickable.Badge>
  )
}
