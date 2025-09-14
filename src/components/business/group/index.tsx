import { Link as LinkWouter } from "wouter"
import type { PropsWithChildren } from "react"
import { StarIcon, MapPinIcon, ChevronRightIcon } from "lucide-react"
import { ScrollArea } from "@base-ui-components/react/scroll-area"

import type { Business } from "@/types/business"
import { Icon } from "@/components/icon"
import { LinkBadge } from "@/components/link"

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
    <h2 className="capitalize font-sora text-neutral-700 font-medium text-lg">
      {title}
    </h2>
  )
}

type LinkProps = Record<"href", string>

export function Link({ href }: LinkProps) {
  return (
    <LinkBadge color="neutral" href={href} size="md">
      <Icon color="neutral" icon={ChevronRightIcon} size="sm" />
    </LinkBadge>
  )
}
type SliderProps = {}

export function Slider({ children }: PropsWithChildren<SliderProps>) {
  return (
    <ScrollArea.Root>
      <ScrollArea.Viewport className="snap-x snap-mandatory flex gap-2 !overflow-y-hidden">
        <ScrollArea.Content className="contents">
          <ul className="contents">{children}</ul>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
    </ScrollArea.Root>
  )
}

type CardProps = { business: Business }

export function Card({ business }: CardProps) {
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "decimal",
    minimumFractionDigits: 1,
  })

  return (
    <li>
      <article className="size-60 relative rounded-xl border border-neutral-100">
        <LinkWouter href={`/business/${business.id}/home/menu`}>
          <div className="flex flex-col h-full w-full">
            <div className="rounded-t-xl grow-1 min-h-0 w-full bg-neutral-50">
              <img
                src={business.logo}
                alt={`cover photo of ${business.name}`}
                className="rounded-t-xl h-full w-full object-cover block"
              />
            </div>

            <div className="p-4 pt-2">
              <div className="flex flex-row justify-between items-center">
                <p className="text-xxs font-sora text-neutral-400 font-light">
                  (N15,000 to unlimited)
                </p>

                <div className="flex gap-1 items-center">
                  <StarIcon className="size-3 stroke-secondary fill-secondary" />
                  <span className="text-xxs font-semibold font-sora">
                    {formatter.format(business.rating)}
                  </span>
                </div>
              </div>

              <div className="h-1" />

              <header>
                <h2 className="text-xs font-sora font-medium text-neutral-700 truncate">
                  {business.name}
                </h2>
              </header>

              <div className="h-4" />

              <address className="flex justify-start items-center gap-1">
                <Icon color="neutral" icon={MapPinIcon} size="xs" />
                <span className="text-xxs font-sora  text-neutral-400 font-light not-italic">
                  {business.town}, {business.city}
                </span>
              </address>
            </div>
          </div>
        </LinkWouter>
      </article>
    </li>
  )
}

export function Skeleton() {
  return (
    <Root>
      <Header>
        <div className="h-8 w-30 bg-neutral-100 border-1 border-neutral-200 animate-pulse rounded-lg" />
        <div className="size-8 bg-neutral-100 border-1 border-neutral-200 animate-pulse rounded-lg" />
      </Header>

      <Slider>
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <li key={i}>
              <div className="size-60 relative rounded-xl border border-neutral-100">
                <div className="flex flex-col h-full w-full">
                  <div className="rounded-t-xl grow-1 bg-neutral-100 border-b-1 border-neutral-200 animate-pulse"></div>

                  <div className="p-4 pt-2">
                    <div className="flex gap-2 justify-between items-start">
                      <div className="h-4 w-24 bg-neutral-100 border-1 border-neutral-200 animate-pulse rounded-xs" />
                      <div className="h-4 w-8 bg-neutral-100 border-1 border-neutral-200 animate-pulse rounded-xs" />
                    </div>

                    <div className="h-1" />

                    <div className="h-5 w-2/3 bg-neutral-100 border-1 border-neutral-200 animate-pulse rounded-xs" />

                    <div className="h-4" />

                    <div className="h-4 w-30 bg-neutral-100 border-1 border-neutral-200 animate-pulse rounded-xs" />
                  </div>
                </div>
              </div>
            </li>
          ))}
      </Slider>
    </Root>
  )
}
