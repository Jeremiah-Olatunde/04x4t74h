import { useState, type ReactNode } from "react"

import { useBusinessAllCache } from "@/hooks/business"
import * as RemoteData from "@/lib/remote-data"

import { GetRecommendations } from "@/components/card"
import * as Scroll from "@/components/scroll"
import * as Business from "@/components/business"
import * as Hero from "./hero"

import { Menu } from "@/components/menu"

import { getCities, getInCity, groupByTag } from "@/utils/business"

export { Recommendations } from "./recommendations"

export { Businesses } from "./businesses"
export { Tags } from "./tags"
export { Tag } from "./tags/[name]"
export { Cities } from "./cities"
export { City } from "./cities/[city]"
export { Town } from "./cities/[city]/[town]"
export { Categories } from "./categories"
export { Category } from "./categories/[name]"

export function Discover() {
  const remoteData = useBusinessAllCache()

  const [city, setCity] = useState<string>()

  const data = RemoteData.map(remoteData, (businesses) => {
    const cities = getCities(businesses)
    const filtered = getInCity(businesses, city ?? cities[0])
    const groups = groupByTag(filtered)
    return { cities, groups }
  })

  return (
    <section className="relative flex flex-col">
      <Scroll.Button.Top />

      <Hero.Root>
        <div className="flex justify-between items-center">
          {RemoteData.fold3Unsafe(data, {
            onNone: (): ReactNode => <Hero.SelectCitySkeleton />,
            onSuccess: ({ cities }): ReactNode => (
              <Hero.SelectCity
                city={city ?? cities[0]}
                cities={cities}
                handleCityChange={setCity}
              />
            ),
          })}

          <Menu color="white" />
        </div>

        <div className="h-8" />

        <Hero.Content />
      </Hero.Root>

      <section className="p-4">
        <GetRecommendations />

        <div className="h-6" />

        {RemoteData.fold3Unsafe(data, {
          onNone: (): ReactNode => {
            return <Business.GroupList.Skeleton.List />
          },
          onSuccess: ({ groups }): ReactNode => {
            const items = groups.map(([name, businesses]) => {
              return [name, `/discover/tags/${name}`, businesses] as const
            })

            return <Business.GroupList.List items={items} />
          },
        })}
      </section>
    </section>
  )
}
