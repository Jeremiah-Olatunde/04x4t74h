import { useState, type ReactNode } from "react"
import { useParams } from "wouter"

import { useBusinessAllCache } from "@/hooks/business"
import { PathParameterError } from "@/lib/errors/ui"
import * as RemoteData from "@/lib/remote-data"

import * as BusinessList from "@/components/business/list"

import { Topbar } from "@/components/topbar"
import * as Breadcrumbs from "@/components/breadcrumbs"
import { ButtonBadge, ButtonScrollTop } from "@/components/button"
import { getInCity } from "@/utils/business"

export function City() {
  const { city } = useParams()

  const [count, setCount] = useState(5)

  if (city === undefined) {
    const tag = "missing"
    const details = { tag } as const
    const parameter = "city"
    const schema = "/cities/:city"
    throw new PathParameterError(parameter, schema, details)
  }

  const remoteData = useBusinessAllCache()

  const businesses = RemoteData.map(remoteData, (businesses) => {
    return getInCity(businesses, city)
  })

  return (
    <section className="min-h-screen">
      <Topbar />
      <ButtonScrollTop />

      <section className="px-6">
        <div className="flex flex-col gap-2">
          <Breadcrumbs.Root>
            <Breadcrumbs.Crumb href="/explore">Explore</Breadcrumbs.Crumb>
            <Breadcrumbs.Divider />
            <Breadcrumbs.Crumb href="/explore/cities">Cities</Breadcrumbs.Crumb>
            <Breadcrumbs.Divider />
            <Breadcrumbs.Crumb href="#" active>
              {city}
            </Breadcrumbs.Crumb>
          </Breadcrumbs.Root>

          <BusinessList.Header.Root
            handleFilter={() => {}}
            handleSort={() => {}}
          >
            <BusinessList.Header.Header>
              <BusinessList.Header.Title>{city}</BusinessList.Header.Title>
              <BusinessList.Header.Subtitle>
                {RemoteData.fold3(businesses, {
                  onFailure: (error): ReactNode => {
                    throw error
                  },
                  onNone: (): ReactNode => <BusinessList.Header.Skeleton />,
                  onSuccess: (businesses): ReactNode => {
                    return (
                      <>
                        <span className="font-semibold">
                          {businesses.length}
                        </span>
                        <span> businesses under the </span>
                        <span className="font-semibold capitalize">{city}</span>
                        <span> city</span>
                      </>
                    )
                  },
                })}
              </BusinessList.Header.Subtitle>
            </BusinessList.Header.Header>
          </BusinessList.Header.Root>
        </div>

        <div className="h-6" />

        {RemoteData.fold3(businesses, {
          onFailure: (error): React.ReactNode => {
            throw error
          },
          onNone: (): React.ReactNode => <BusinessList.Skeleton />,
          onSuccess: (businesses): React.ReactNode => {
            return (
              <BusinessList.List>
                {businesses.slice(0, count).map((b) => {
                  return <BusinessList.Card key={b.id} business={b} />
                })}
              </BusinessList.List>
            )
          },
        })}

        <div className="h-6" />

        <ButtonBadge
          color="neutral"
          size="md"
          type="button"
          onClick={() => setCount(count + 5)}
        >
          Show More
        </ButtonBadge>

        <div className="h-6" />
      </section>
    </section>
  )
}
