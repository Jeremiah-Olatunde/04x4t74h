import type { PropsWithChildren } from "react"
import { MapPinIcon, StarIcon } from "lucide-react"
import { Link as LinkWouter } from "wouter"

import type { Business } from "@/types/business"
import { Icon } from "@/components/icon"

type CardProps = { business: Business }

export function Card({ business }: CardProps) {
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "decimal",
    minimumFractionDigits: 1,
  })

  return (
    <li>
      <article className="w-full h-90 relative rounded-xl border border-neutral-100">
        <LinkWouter href={`/business/${business.id}/home/menu`}>
          <div className="flex flex-col h-full w-full">
            <div className="rounded-t-xl grow-1 min-h-0 w-full bg-neutral-50">
              <img
                src={business.logo}
                alt={`cover photo of ${business.name}`}
                className="rounded-t-xl h-full w-full object-cover block"
              />
            </div>

            <div className="p-6 pt-4">
              <div className="flex flex-row justify-between items-center">
                <p className="text-xs font-sora text-neutral-400 font-light">
                  (N15,000 to unlimited)
                </p>

                <div className="flex gap-1 items-center">
                  <StarIcon className="size-4 stroke-secondary fill-secondary" />
                  <span className="text-xs font-semibold font-sora">
                    {formatter.format(business.rating)}
                  </span>
                </div>
              </div>

              <div className="h-2" />

              <header>
                <h2 className="text-sm font-sora font-medium text-neutral-700 truncate">
                  {business.name}
                </h2>
              </header>

              <div className="h-6" />

              <address className="flex justify-start items-center gap-1">
                <Icon color="neutral" icon={MapPinIcon} size="sm" />
                <span className="text-xs font-sora  text-neutral-400 font-light not-italic">
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

type RootProps = {}
export function Root({ children }: PropsWithChildren<RootProps>) {
  return <ul className="flex flex-col gap-6">{children}</ul>
}

export function Skeleton() {
  return (
    <Root>
      {Array(10)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="size-full relative rounded-xl border border-neutral-100"
          >
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
        ))}
      )
    </Root>
  )
}
