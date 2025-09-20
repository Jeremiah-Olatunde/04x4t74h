import { useState, type ReactNode } from "react"

import { useBusinessAllCache } from "@/hooks/business"

import * as RemoteData from "@/lib/remote-data"

import * as BusinessList from "@/components/business/list"
import * as Breadcrumbs from "@/components/breadcrumbs"
import * as Scroll from "@/components/scroll"

import { Topbar } from "@/components/topbar"
import { ButtonBadge } from "@/components/button"
import { useSearchParams } from "wouter"
import { search } from "@/utils/business"

import { WithControls as Header } from "@/components/header"

export function Results() {
  const [count, setCount] = useState(5)

  const [params] = useSearchParams()
  const term = params.get("term") ?? ""
  const categories = params.getAll("category")
  const tags = params.getAll("tag")
  const amenities = params.getAll("amenity")
  const cities = params.getAll("city")

  const remoteData = useBusinessAllCache()
  const businesses = RemoteData.map(remoteData, (businesses) => {
    const term = params.get("term") ?? ""
    const filteredSearch = search(businesses, term).filter((business) => {
      const hasCategories =
        categories.length === 0 ||
        categories.includes(business.businessCategory)

      const hasTags =
        tags.length === 0 || tags.some((tag) => business.tags.includes(tag))

      const hasAmenities =
        amenities.length === 0 ||
        amenities.some((amenity) => business.amenities.includes(amenity))

      const hasCities = cities.length === 0 || cities.includes(business.city)

      return hasCategories && hasTags && hasAmenities && hasCities
    })
    return filteredSearch
  })

  const filterCount =
    categories.length + tags.length + amenities.length + cities.length

  return (
    <section className="min-h-screen">
      <Topbar />
      <Scroll.Button.Top />

      <Scroll.Auto.Top>
        <section className="flex flex-col gap-6 px-6">
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
                <Header.Control.Filter href="#" />
                <Header.Control.Sort href="#" />
              </Header.Control.Root>
            </Header.Root>
          </div>

          {filterCount !== 0 && (
            <div className="p-4 rounded-xl bg-neutral-50 border-1 border-neutral-100">
              <div>
                <div className="font-sora font-semibold text-sm text-neutral-600">
                  Filters ({filterCount})
                </div>
                <div className="h-4" />
                <div className="flex flex-row flex-wrap gap-2">
                  {[...categories, ...tags, ...amenities, ...cities].map(
                    (item) => {
                      console.log(item)
                      return (
                        <div
                          className="
                      capitalize font-sora text-xs text-neutral-400
                      border-1 border-neutral-200 bg-neutral-100 px-3 py-2 rounded-xl 
                    "
                        >
                          {item}
                        </div>
                      )
                    },
                  )}
                </div>
              </div>
            </div>
          )}
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

          <ButtonBadge
            color="neutral"
            size="md"
            type="button"
            onClick={() => setCount(count + 5)}
          >
            Show More
          </ButtonBadge>

          <div />
        </section>
      </Scroll.Auto.Top>
    </section>
  )
}
