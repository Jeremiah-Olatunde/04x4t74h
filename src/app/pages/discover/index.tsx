import { useState, type ReactNode } from "react"

import { useBusinessAllCache } from "@/hooks/business"
import * as RemoteData from "@/lib/remote-data"

import { GetRecommendations } from "@/components/card"

import * as Scroll from "@/components/scroll"
import * as Group from "@/components/group"
import * as GroupList from "@/components/group-list"
import * as Card from "@/components/business/card"
import * as Hero from "./hero"

import { Menu } from "@/components/menu"

import { getCities, getInCity, groupByTag } from "@/utils/business"

export { Recommendations } from "./recommendations"

export function Discover() {
  const remoteData = useBusinessAllCache()

  const [city, setCity] = useState<string>()
  const [tagCount, setTagCount] = useState(5)

  const data = RemoteData.map(remoteData, (businesses) => {
    const cities = getCities(businesses)
    const filtered = getInCity(businesses, city ?? cities[0])
    const byTag = groupByTag(filtered)
    return { cities, byTag }
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

        <GroupList.Root>
          {RemoteData.fold3Unsafe(data, {
            onNone: (): React.ReactNode => {
              return [0, 1, 2, 3, 4].map((i) => {
                return (
                  <GroupList.Group key={i}>
                    <Group.Root>
                      <Group.Header>
                        <Group.Skeleton.Title />
                        <Group.Control.Skeleton.ViewMore />
                      </Group.Header>

                      <Group.List>
                        {[0, 1, 2, 3, 4].map((i) => (
                          <Group.Item key={i}>
                            <Card.Skeleton.Small />
                          </Group.Item>
                        ))}
                      </Group.List>
                    </Group.Root>
                  </GroupList.Group>
                )
              })
            },
            onSuccess: ({ byTag }): React.ReactNode => {
              return byTag.slice(0, tagCount).map(([tag, businesses]) => {
                return (
                  <GroupList.Group key={tag}>
                    <Group.Root>
                      <Group.Header>
                        <Group.Title title={tag} />
                        <Group.Control.ViewMore href={`/explore/tags/${tag}`} />
                      </Group.Header>

                      <Group.List>
                        {businesses.slice(0, 5).map((b) => (
                          <Group.Item key={b.id}>
                            <Card.Small business={b} />
                          </Group.Item>
                        ))}
                      </Group.List>
                    </Group.Root>
                  </GroupList.Group>
                )
              })
            },
          })}

          <GroupList.Control.ShowMore
            onClick={() => setTagCount(tagCount + 5)}
          />
        </GroupList.Root>
      </section>
    </section>
  )
}
