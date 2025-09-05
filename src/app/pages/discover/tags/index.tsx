import { useState } from "react"
import { Link as LinkWouter } from "wouter"

import { group } from "@/utils"
import { useBusinessAllCache } from "@/hooks/business"
import { ButtonBadge, ButtonScrollTop } from "@/components/button"
import { Topbar } from "@/components/topbar"
import * as BusinessList from "@/components/business/list"
import * as RemoteData from "@/lib/remote-data"
import * as Breadcrumbs from "@/components/breadcrumbs"
import * as Header from "@/components/header"
import { LinkBadge } from "@/components/link"

export function Tags() {
  const remoteData = useBusinessAllCache()
  const [city] = useState<string>()
  const [tagCount, setTagCount] = useState(5)

  const data = RemoteData.map(remoteData, (businesses) => {
    const cities = new Set(businesses.map((b) => b.city))
      .values()
      .toArray() as readonly string[]

    const tags = [...new Set(businesses.flatMap((b) => b.tags))] as const

    const targetCity = city ?? cities[0]
    const filtered = businesses.filter((b) => b.city === targetCity)
    const byTags = group(filtered, tags, (business, tag) => {
      return business.tags.includes(tag)
    })

    return { cities, byTags, tags }
  })

  return (
    <section className="relative flex flex-col">
      <ButtonScrollTop />
      <Topbar />

      <section className="p-6 pt-0 flex flex-col gap-4">
        <div className="flex flex-col justify-center items-center gap-2">
          <Breadcrumbs.Root>
            <Breadcrumbs.Crumb href="/discover/home">
              Discover
            </Breadcrumbs.Crumb>
            <Breadcrumbs.Divider />
            <Breadcrumbs.Crumb href="#" active>
              Tags
            </Breadcrumbs.Crumb>
          </Breadcrumbs.Root>

          <Header.Root>
            <Header.Title>Explore by Tags</Header.Title>
            <Header.Subtitle>
              Explore businesses grouped by what they do
            </Header.Subtitle>
          </Header.Root>
        </div>

        <ul className="flex flex-row flex-wrap gap-2 justify-center">
          {RemoteData.fold3(data, {
            onNone: (): React.ReactNode => {
              return Array(15)
                .fill(0)
                .map((_, index) => {
                  const width = 40 + Math.random() * 40
                  return (
                    <li key={index}>
                      <div
                        className={`p-1 h-6 bg-neutral-100 border-1 border-neutral-200 animate-pulse rounded-sm`}
                        style={{ width: `${width}px` }}
                      />
                    </li>
                  )
                })
            },
            onFailure: (error): React.ReactNode => {
              throw error
            },
            onSuccess: ({ tags }): React.ReactNode => {
              return tags.map((tag) => {
                return (
                  <li key={tag}>
                    <LinkBadge
                      href={`/discover/tags/${tag}`}
                      size="sm"
                      color="light"
                    >
                      {tag}
                    </LinkBadge>
                  </li>
                )
              })
            },
          })}
        </ul>

        <div className="flex flex-col gap-8">
          {RemoteData.fold3(data, {
            onNone: (): React.ReactNode => {
              return Array(5)
                .fill(0)
                .map((_, index) => {
                  return (
                    <BusinessList.Root key={index}>
                      <BusinessList.Header>
                        <div className="h-8 w-30 bg-neutral-100 border-1 border-neutral-200 animate-pulse rounded-lg" />
                        <div className="size-8 bg-neutral-100 border-1 border-neutral-200 animate-pulse rounded-lg" />
                      </BusinessList.Header>

                      <BusinessList.SliderSkeleton />
                    </BusinessList.Root>
                  )
                })
            },
            onFailure: (error): React.ReactNode => {
              throw error
            },
            onSuccess: ({ byTags }): React.ReactNode => {
              return byTags.slice(0, tagCount).map(([tag, businesses]) => {
                return (
                  <BusinessList.Root key={tag}>
                    <BusinessList.Header>
                      <BusinessList.Title title={tag} />
                      <BusinessList.Link href={`/discover/tags/${tag}`} />
                    </BusinessList.Header>

                    <BusinessList.Slider businesses={businesses.slice(0, 5)} />
                  </BusinessList.Root>
                )
              })
            },
          })}

          <ButtonBadge
            color="neutral"
            size="md"
            type="button"
            onClick={() => setTagCount(tagCount + 5)}
          >
            Show More
          </ButtonBadge>
        </div>
      </section>
    </section>
  )
}

function Badge() {}
