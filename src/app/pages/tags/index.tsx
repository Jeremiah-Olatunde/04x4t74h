import { useParams } from "wouter"

import { useBusinessAllCache } from "@/hooks/business"
import { PathParameterError } from "@/lib/errors/ui"
import * as RemoteData from "@/lib/remote-data"

import {
  Business as BusinessCard,
  BusinessSkeleton,
} from "@/components/business/card"
import { Topbar } from "@/components/topbar"

export function Tags() {
  const { tagName } = useParams()

  if (tagName === undefined) {
    const tag = "missing"
    const details = { tag } as const
    const parameter = "tagName"
    const schema = "/tags/:tagName"
    throw new PathParameterError(parameter, schema, details)
  }

  const remoteData = useBusinessAllCache()

  const filtered = RemoteData.map(remoteData, (businesses) => {
    return businesses.filter((business) => business.tags.includes(tagName))
  })

  return (
    <section className="min-h-screen">
      <Topbar />

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
