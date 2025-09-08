import { useState } from "react"

import { useBusinessAllCache } from "@/hooks/business"
import { ButtonBadge, ButtonScrollTop } from "@/components/button"
import { Topbar } from "@/components/topbar"
import * as BusinessGroup from "@/components/business/group"
import * as RemoteData from "@/lib/remote-data"
import * as Breadcrumbs from "@/components/breadcrumbs"
import * as Header from "@/components/header"
import { LinkBadge } from "@/components/link"
import { groupByCity } from "@/utils/business"

export function Cities() {
  const [count, setCount] = useState(5)
  const remoteData = useBusinessAllCache()

  const data = RemoteData.map(remoteData, (businesses) => {
    const grouped = groupByCity(businesses)
    return { grouped }
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
              Cities
            </Breadcrumbs.Crumb>
          </Breadcrumbs.Root>

          <Header.Root>
            <Header.Title>Explore by City</Header.Title>
            <Header.Subtitle>
              Uncover the best spots in every city.
            </Header.Subtitle>
          </Header.Root>
        </div>

        <ul className="flex flex-row flex-wrap gap-2 justify-center">
          {RemoteData.fold3(data, {
            onNone: (): React.ReactNode => {
              return Array(4)
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
            onSuccess: ({ grouped }): React.ReactNode => {
              return grouped.map(([name]) => {
                return (
                  <li key={name}>
                    <LinkBadge
                      href={`/explore/cities/${name}`}
                      size="sm"
                      color="light"
                    >
                      {name}
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
            onSuccess: ({ grouped }): React.ReactNode => {
              return grouped.slice(0, count).map(([name, businesses]) => {
                return (
                  <BusinessGroup.Root key={name}>
                    <BusinessGroup.Header>
                      <BusinessGroup.Title title={name} />
                      <BusinessGroup.Link href={`/explore/cities/${name}`} />
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
            onClick={() => setCount(count + 5)}
          >
            Show More
          </ButtonBadge>
        </div>
      </section>
    </section>
  )
}
