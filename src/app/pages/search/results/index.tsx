import { useState, type ReactNode } from "react"

import { useBusinessAllCache } from "@/hooks/business"
import * as RemoteData from "@/lib/remote-data"

import * as BusinessList from "@/components/business/list"

import { Topbar } from "@/components/topbar"
import * as Breadcrumbs from "@/components/breadcrumbs"
import { ButtonBadge, ButtonScrollTop } from "@/components/button"
import { useSearchParams } from "wouter"
import { search } from "@/utils/business"

export function Results() {
  const [count, setCount] = useState(5)
  const [params] = useSearchParams()

  const remoteData = useBusinessAllCache()

  const term = params.get("term") ?? ""

  const businesses = RemoteData.map(remoteData, (businesses) => {
    const term = params.get("term") ?? ""
    return search(businesses, term)
  })

  return (
    <section className="min-h-screen">
      <Topbar />
      <ButtonScrollTop />

      <section className="px-6">
        <div className="flex flex-col gap-2">
          <Breadcrumbs.Root>
            <Breadcrumbs.Crumb href="/search">Search</Breadcrumbs.Crumb>
            <Breadcrumbs.Divider />
            <Breadcrumbs.Crumb href="#" active>
              Results
            </Breadcrumbs.Crumb>
          </Breadcrumbs.Root>

          <BusinessList.Header.Root
            handleFilter={() => {}}
            handleSort={() => {}}
          >
            <BusinessList.Header.Header>
              <BusinessList.Header.Title>Search</BusinessList.Header.Title>
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
                        <span> businesses matching </span>
                        <span className="italic font-semibold">"{term}"</span>
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
