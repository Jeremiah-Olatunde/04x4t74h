import { type ReactNode } from "react"
import { useParams } from "wouter"

import { useBusinessAllCache } from "@/hooks/business"
import { PathParameterError } from "@/lib/errors/ui"
import * as RemoteData from "@/lib/remote-data"

import * as Business from "@/components/business"
import * as Breadcrumbs from "@/components/breadcrumbs"
import * as Header from "@/components/header"
import * as Scroll from "@/components/scroll"

import { Topbar } from "@/components/topbar"

import { getInTown } from "@/utils/business"

export function Town() {
  const { town, city } = useParams()

  if (town === undefined) {
    const tag = "missing"
    const details = { tag } as const
    const parameter = "town"
    const schema = "/discover/cities/:city/:town"
    throw new PathParameterError(parameter, schema, details)
  }

  if (city === undefined) {
    const tag = "missing"
    const details = { tag } as const
    const parameter = "city"
    const schema = "/discover/cities/:city/:town"
    throw new PathParameterError(parameter, schema, details)
  }

  const remoteData = useBusinessAllCache()

  const businesses = RemoteData.map(remoteData, (businesses) => {
    return getInTown(businesses, town)
  })

  return (
    <section className="min-h-screen">
      <Scroll.Button.Top />

      <Topbar />

      <section className="p-4 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Breadcrumbs.Root>
            <Breadcrumbs.Crumb href="/discover">Discover</Breadcrumbs.Crumb>
            <Breadcrumbs.Divider />
            <Breadcrumbs.Crumb href="/discover/cities" collapse>
              Cities
            </Breadcrumbs.Crumb>
            <Breadcrumbs.Divider />
            <Breadcrumbs.Crumb href={`/discover/cities/${city}`}>
              {city}
            </Breadcrumbs.Crumb>
            <Breadcrumbs.Divider />
            <Breadcrumbs.Crumb href={`/discover/cities/${city}/${town}`} active>
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
                        <span className="font-semibold capitalize">
                          {town},
                        </span>
                        <span> {city}</span>
                      </>
                    )
                  },
                })}
              </Header.Subtitle>
            </Header.Content>

            <Header.Control.Root>
              <Header.Control.Filters href="#" />
              <Header.Control.Sort href="#" />
            </Header.Control.Root>
          </Header.Root>
        </div>

        {RemoteData.fold3Unsafe(businesses, {
          onNone: (): React.ReactNode => {
            return <Business.CardGrid.Skeleton.Grid />
          },
          onSuccess: (businesses): React.ReactNode => {
            return <Business.CardGrid.Grid businesses={businesses} />
          },
        })}
      </section>
    </section>
  )
}
