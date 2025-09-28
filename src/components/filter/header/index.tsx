import type { PropsWithChildren } from "react"
import { ChevronLeftIcon } from "lucide-react"
import { Link as LinkWouter } from "wouter"

import * as Clickable from "@/components/clickable"

type RootProps = {}
export function Root({ children }: PropsWithChildren<RootProps>) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center justify-center gap-2">
      {children}
    </div>
  )
}

export function Back() {
  return (
    <div>
      <Clickable.Badge
        as="button"
        type="button"
        color="neutral"
        size="md"
        onClick={() => history.back()}
      >
        <ChevronLeftIcon className="text-neutral-600 size-4" />
      </Clickable.Badge>
    </div>
  )
}

type ApplyProps = { href: string }
export function Apply({ href }: ApplyProps) {
  return (
    <div>
      <LinkWouter
        href={href}
        className="bg-primary text-white text-xxs font-sora px-5 py-2 rounded-md"
      >
        Apply
      </LinkWouter>
    </div>
  )
}

type TitleProps = { term: string }
export function Title({ term }: TitleProps) {
  return (
    <div className="flex flex-col justify-center items-center">
      <span className="font-sora text-neutral-600 text-lg font-bold">
        Filters
      </span>
      <span className="font-sora text-neutral-400 text-xs text-center">
        Filtering results for
        <span className="font-medium"> "{term}"</span>
      </span>
    </div>
  )
}
