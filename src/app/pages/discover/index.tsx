import { useState, type ReactNode } from "react"

import * as RemoteData from "@/lib/remote-data"
import { useBusinessAllCache } from "@/hooks/business"

import { GetRecommendations } from "@/components/card"
import { ButtonBadge, ButtonScrollTop } from "@/components/button"
import * as BusinessGroup from "@/components/business/group"

import * as Hero from "./hero"
import { Menu } from "@/components/menu"
import { group } from "@/utils"

export function Discover() {
  const remoteData = useBusinessAllCache()

  const [city, setCity] = useState<string>()

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

    return { cities, byTags }
  })

  return (
    <section className="relative flex flex-col">
      <ButtonScrollTop />

      <Hero.Root>
        <div className="flex justify-between items-center">
          {RemoteData.fold3(data, {
            onNone: (): ReactNode => {
              return <Hero.SelectCitySkeleton />
            },
            onFailure: (error): ReactNode => {
              throw error
            },
            onSuccess: ({ cities }): ReactNode => {
              return (
                <Hero.SelectCity
                  city={city ?? cities[0]}
                  cities={cities}
                  handleCityChange={setCity}
                />
              )
            },
          })}

          <Menu color="white" />
        </div>

        <div className="h-8" />

        <Hero.Content />
      </Hero.Root>

      <section className="p-6">
        <GetRecommendations />

        <div className="h-8" />

        <div className="flex flex-col gap-8">
          {RemoteData.fold3(data, {
            onFailure: (error): React.ReactNode => {
              throw error
            },
            onNone: (): React.ReactNode => {
              return Array(5)
                .fill(0)
                .map((_, index) => <BusinessGroup.Skeleton key={index} />)
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

export { Recommendations } from "./recommendations"
