import { type ReactNode } from "react"

import { useSearchParams } from "wouter"
import { useBusinessAllCache } from "@/hooks/business"

import * as RemoteData from "@/lib/remote-data"
import * as Business from "@/features/business/components"
import * as Breadcrumbs from "@/components/breadcrumbs"
import * as Scroll from "@/components/scroll"

import { Topbar } from "@/components/topbar"
import * as Header from "@/components/header"

import { search } from "@/utils/business"

import { Chips } from "@/features/business/components/filter"
import { Url, Filter } from "@/features/business/lib"

export function Results() {
  const [params] = useSearchParams()
  const term = params.get("term")

  if (term === "" || term === null) {
    throw new Error("[search] term can be neither empty nor null")
  }

  const filters = Url.enumerate(params)

  const remoteData = useBusinessAllCache()
  const businesses = RemoteData.map(remoteData, (businesses) => {
    const searched = search(businesses, term)
    return Filter.apply(Filter.fromParams(params), searched)
  })

  return (
    <section className="min-h-screen">
      <Scroll.Auto.Top />
      <Scroll.Button.Top />

      <Topbar />

      <section className="p-4 flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <Breadcrumbs.Root>
            <Breadcrumbs.Crumb href="#" active>
              Results
            </Breadcrumbs.Crumb>
          </Breadcrumbs.Root>

          <Header.Root>
            <Header.Content>
              <Header.Title>Search</Header.Title>
              <Header.Subtitle>
                {RemoteData.fold3Unsafe(businesses, {
                  onNone: (): ReactNode => <Header.Skeleton.Subtitle />,
                  onSuccess: (businesses): ReactNode => {
                    return (
                      <>
                        <span className="font-semibold">
                          {businesses.length}
                        </span>
                        <span> results for </span>
                        <span className="font-semibold">"{term}"</span>
                        <span> matching filters </span>
                      </>
                    )
                  },
                })}
              </Header.Subtitle>
            </Header.Content>

            <Header.Control.Root>
              <Header.Control.Filters
                href={`/search/results/filters?${params.toString()}`}
              />
              <Header.Control.Sort href="#" />
            </Header.Control.Root>
          </Header.Root>
        </div>

        <Chips chips={filters} />

        {RemoteData.fold3Unsafe(businesses, {
          onNone: (): React.ReactNode => {
            return <Business.Skeleton.CardGrid />
          },
          onSuccess: (businesses): React.ReactNode => {
            return <Business.CardGrid businesses={businesses} />
          },
        })}
      </section>
    </section>
  )
}
