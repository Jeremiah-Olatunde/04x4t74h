import { useParams } from "wouter"

import { useBusinessAllCache } from "@/hooks/business"
import { PathParameterError } from "@/lib/errors/ui"
import * as RemoteData from "@/lib/remote-data"
import { LinkBack } from "@/components/link"
import type { PropsWithChildren } from "react"
import { ListFilterIcon } from "lucide-react"

import {
  Business as BusinessCard,
  BusinessSkeleton,
} from "@/components/business/card"

export function Tags() {
  const { tagName } = useParams()

  if (tagName === undefined) {
    const tag = "missing"
    const details = { tag } as const
    const parameter = "tagName"
    const schema = "/tags/:tagName"
    throw new PathParameterError(parameter, schema, details)
  }

  const formatted = tagName.charAt(0).toUpperCase() + tagName.slice(1)

  const remoteData = useBusinessAllCache()

  const filtered = RemoteData.map(remoteData, (businesses) => {
    return businesses.filter((business) => business.tags.includes(tagName))
  })

  return (
    <section className="min-h-screen flex flex-col gap-6">
      <div />
      <div className="px-6">
        <Topbar href="/home">
          <h1 className="font-sora text-xl text-neutral-700 font-bold">
            {formatted}
          </h1>
        </Topbar>
      </div>
      <section className="px-6">
        <ul className="flex flex-col gap-6">
          {RemoteData.fold3(filtered, {
            onNone: (): React.ReactNode => {
              return Array(5)
                .fill(0)
                .map((_, index) => {
                  return (
                    <li key={index} className="h-80">
                      <BusinessSkeleton size="lg" />
                    </li>
                  )
                })
            },
            onFailure: (error): React.ReactNode => {
              throw error
            },
            onSuccess: (businesses): React.ReactNode => {
              return businesses.map((business) => {
                return (
                  <li key={business.id} className="h-80">
                    <BusinessCard details={business} size="lg" />
                  </li>
                )
              })
            },
          })}
        </ul>
      </section>
    </section>
  )
}

type TopbarProps = { href: string }
function Topbar({ href, children }: PropsWithChildren<TopbarProps>) {
  return (
    <section className="relative flex flex-row justify-between items-center">
      <LinkBack href={href} />
      <ButtonFilters />
      <div className="absolute top-1/2 left-1/2 -translate-1/2">{children}</div>
    </section>
  )
}

type ButtonFiltersProps = {}
function ButtonFilters({}: ButtonFiltersProps) {
  return (
    <button
      className="flex flex-row gap-1 bg-primary p-2 rounded-lg items-center justify-center"
      type="button"
      onClick={() => {}}
    >
      <ListFilterIcon className="text-white size-3" />
      <span className="font-sora text-white text-xs font-medium">Filters</span>
    </button>
  )
}
