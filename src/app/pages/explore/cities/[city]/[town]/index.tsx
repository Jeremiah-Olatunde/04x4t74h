import { useState, type ReactNode } from "react"
import { useParams } from "wouter"

import { useBusinessAllCache } from "@/hooks/business"
import { PathParameterError } from "@/lib/errors/ui"
import * as RemoteData from "@/lib/remote-data"

import * as BusinessList from "@/components/business/list"
import { WithControls as Header } from "@/components/header"

import { Topbar } from "@/components/topbar"
import * as Breadcrumbs from "@/components/breadcrumbs"
import * as Scroll from "@/components/scroll"
import { ButtonBadge } from "@/components/button"
import { getInTown } from "@/utils/business"

export function Town() {
  const { town, city } = useParams()

  const [count, setCount] = useState(5)

  if (town === undefined) {
    const tag = "missing"
    const details = { tag } as const
    const parameter = "town"
    const schema = "/cities/:city/:town"
    throw new PathParameterError(parameter, schema, details)
  }

  if (city === undefined) {
    const tag = "missing"
    const details = { tag } as const
    const parameter = "city"
    const schema = "/cities/:city/:town"
    throw new PathParameterError(parameter, schema, details)
  }

  const remoteData = useBusinessAllCache()

  const businesses = RemoteData.map(remoteData, (businesses) => {
    return getInTown(businesses, town)
  })

  return (
    <section className="min-h-screen">
      <Topbar />
      <Scroll.Button.Top />

      <section className="px-6">
        <div className="flex flex-col gap-2">
          <Breadcrumbs.Root>
            <Breadcrumbs.Crumb href="/explore">Explore</Breadcrumbs.Crumb>
            <Breadcrumbs.Divider />
            <Breadcrumbs.Crumb href="/explore/cities">Cities</Breadcrumbs.Crumb>
            <Breadcrumbs.Divider />
            <Breadcrumbs.Crumb href={`/explore/cities/${city}`}>
              {city}
            </Breadcrumbs.Crumb>
            <Breadcrumbs.Divider />
            <Breadcrumbs.Crumb href={`/explore/cities/${city}/${town}`} active>
              {town}
            </Breadcrumbs.Crumb>
          </Breadcrumbs.Root>

          <Header.Root>
            <Header.Content>
              <Header.Title>{town}</Header.Title>
              <Header.Subtitle>
                {RemoteData.fold3Unsafe(businesses, {
                  onNone: (): ReactNode => <Header.Skeleton.Subtitle />,
                  onSuccess: (businesses): ReactNode => {
                    return (
                      <>
                        <span className="font-semibold">
                          {businesses.length}
                        </span>
                        <span> businesses in </span>
                        <span className="font-semibold capitalize">{town}</span>
                      </>
                    )
                  },
                })}
              </Header.Subtitle>
            </Header.Content>

            <Header.Control.Root>
              <Header.Control.Filter href="#" />
              <Header.Control.Sort href="#" />
            </Header.Control.Root>
          </Header.Root>
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
