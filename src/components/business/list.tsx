import type { PropsWithChildren } from "react"
import { ChevronRight as IconChevronRight } from "lucide-react"
import { ScrollArea } from "@base-ui-components/react/scroll-area"

import { Icon } from "@/components/icon"
import { LinkBadge } from "@/components/link"

import { type BusinessDetails, Business, BusinessSkeleton } from "./card"

export function Root({ children }: PropsWithChildren<{}>) {
  return <section className="flex flex-col gap-4">{children}</section>
}

export function Header({ children }: PropsWithChildren<{}>) {
  return (
    <header className="flex justify-between items-center">{children}</header>
  )
}

type TitleProps = Record<"title", string>

export function Title({ title }: TitleProps) {
  return (
    <h2 className="capitalize font-sora text-neutral-700 font-medium ">
      {title}
    </h2>
  )
}

type SliderProps = Record<"businesses", readonly BusinessDetails[]>

export function Slider({ businesses }: SliderProps) {
  return (
    <ScrollArea.Root>
      <ScrollArea.Viewport className="snap-x snap-mandatory flex gap-2 !overflow-y-hidden">
        <ScrollArea.Content className="contents">
          {businesses.map((business) => (
            <div key={business.id} className="snap-start size-60 shrink-0">
              <Business details={business} />
            </div>
          ))}
        </ScrollArea.Content>
      </ScrollArea.Viewport>
    </ScrollArea.Root>
  )
}

export function SliderSkeleton() {
  return (
    <ScrollArea.Root>
      <ScrollArea.Viewport className="snap-x snap-mandatory flex gap-2 overflow-x-scroll no-scrollbar">
        <ScrollArea.Content className="contents">
          {Array(2)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="snap-start size-60 shrink-0">
                <BusinessSkeleton />
              </div>
            ))}
        </ScrollArea.Content>
      </ScrollArea.Viewport>
    </ScrollArea.Root>
  )
}

type LinkProps = Record<"href", string>
export function Link({ href }: LinkProps) {
  return (
    <LinkBadge color="neutral" href={href} size="md">
      <Icon color="neutral" icon={IconChevronRight} size="sm" />
    </LinkBadge>
  )
}
