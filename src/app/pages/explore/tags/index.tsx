import { useState } from "react"

import { group } from "@/utils"
import { useBusinessAllCache } from "@/hooks/business"
import { ButtonBadge, ButtonScrollTop } from "@/components/button"
import { Topbar } from "@/components/topbar"
import * as BusinessGroup from "@/components/business/group"
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
            <Breadcrumbs.Crumb href="/explore">Explore</Breadcrumbs.Crumb>
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
                      href={`/explore/tags/${tag}`}
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
                .map((_, index) => <BusinessGroup.Skeleton key={index} />)
            },
            onFailure: (error): React.ReactNode => {
              throw error
            },
            onSuccess: ({ byTags }): React.ReactNode => {
              return byTags.slice(0, tagCount).map(([tag, businesses]) => {
                return (
                  <BusinessGroup.Root key={tag}>
                    <BusinessGroup.Header>
                      <BusinessGroup.Title title={tag} />
                      <BusinessGroup.Link href={`/explore/tags/${tag}`} />
                    </BusinessGroup.Header>

                    <BusinessGroup.Slider>
                      {businesses.slice(0, 5).map((b) => (
                        <BusinessGroup.Card key={b.id} business={b} />
                      ))}
                    </BusinessGroup.Slider>
                  </BusinessGroup.Root>
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
