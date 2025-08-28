import { useState, type ReactNode } from "react"
import { MenuIcon } from "lucide-react"

import * as Hero from "./hero"
import * as BusinessList from "@/components/business/list"
import { GetRecommendations } from "@/components/card"
import { useBusinesses } from "@/hooks/business"
import * as RemoteData from "@/lib/remote-data"
import { ButtonBadge } from "@/components/button"

export function Home() {
  const remoteData = useBusinesses()

  const [city, setCity] = useState<string>()

  const [tagCount, setTagCount] = useState(5)

  const data = RemoteData.map(remoteData, (businesses) => {
    const cities = new Set(businesses.map((b) => b.city))
      .values()
      .toArray() as readonly string[]

    const tags = [...new Set(businesses.flatMap((b) => b.tags))] as const

    const targetCity = city ?? cities[0]
    const filtered = businesses.filter((b) => b.city === targetCity)
    const groups = group(filtered, tags, (business, tag) => {
      return business.tags.includes(tag)
    })

    return { cities, groups }
  })

  return (
    <section className="relative flex flex-col">
      <div className="fixed top-6 right-6 z-10">
        <Hero.Sidebar />
      </div>

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

          <div className="opacity-0 border-1 border-neutral-300 bg-white rounded-lg p-0.5">
            <MenuIcon className="text-neutral-400 size-6" />
          </div>
        </div>

        <div className="h-4" />

        <Hero.Content />
      </Hero.Root>

      <section className="p-6">
        <GetRecommendations />

        <div className="h-8" />

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
            onSuccess: ({ groups }): React.ReactNode => {
              return groups.slice(0, tagCount).map(([tag, businesses]) => {
                return (
                  <BusinessList.Root key={tag}>
                    <BusinessList.Header>
                      <BusinessList.Title title={tag} />
                      <BusinessList.Link href={`/search?tag=${tag}`} />
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

export function group<T>(
  items: readonly T[],
  groups: readonly string[],
  belongs: (item: T, group: string) => boolean,
) {
  const map: Map<string, T[]> = new Map(groups.map((g) => [g, []]))

  for (const group of groups) {
    for (const item of items) {
      if (belongs(item, group)) map.get(group)?.push(item)
    }
  }

  return map.entries().toArray()
}
