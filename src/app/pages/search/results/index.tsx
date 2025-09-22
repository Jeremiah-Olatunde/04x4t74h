import { type ReactNode } from "react"

import { useSearchParams } from "wouter"
import { useBusinessAllCache } from "@/hooks/business"

import * as RemoteData from "@/lib/remote-data"
import * as Business from "@/components/business"
import * as Breadcrumbs from "@/components/breadcrumbs"
import * as Scroll from "@/components/scroll"

import { Topbar } from "@/components/topbar"
import { WithControls as Header } from "@/components/header"

import { search } from "@/utils/business"

export function Results() {
  const [params] = useSearchParams()
  const term = params.get("term") ?? ""

  const remoteData = useBusinessAllCache()

  const businesses = RemoteData.map(remoteData, (businesses) => {
    const term = params.get("term") ?? ""
    const filteredSearch = search(businesses, term)
    return filteredSearch
  })

  return (
    <section className="min-h-screen">
      <Scroll.Auto.Top />
      <Scroll.Button.Top />

      <Topbar />

      <section className="px-4">
        <div className="flex flex-col gap-2">
          <Breadcrumbs.Root>
            <Breadcrumbs.Crumb href="/search">Search</Breadcrumbs.Crumb>
            <Breadcrumbs.Divider />
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
                        <span> businesses matching </span>
                        <span className="italic font-semibold">"{term}"</span>
                      </>
                    )
                  },
                })}
              </Header.Subtitle>
            </Header.Content>

            <Header.Control.Root>
              <Header.Control.Filter href="/search/results/filter" />
              <Header.Control.Sort href="#" />
            </Header.Control.Root>
          </Header.Root>
        </div>

        <div className="h-6" />

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
