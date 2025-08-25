import { Hero } from "./hero"
import * as BusinessList from "@/components/business/list"
import { GetRecommendations } from "@/components/card"
import { useBusinesses } from "@/hooks/business"
import { isFailure, isInitial, isPending } from "@/lib/remote-data"
import { LoadingScreen } from "@/components/loading"

export function Home() {
  const remoteData = useBusinesses()

  if (isInitial(remoteData) || isPending(remoteData)) {
    return <LoadingScreen />
  }

  if (isFailure(remoteData)) {
    throw remoteData.error
  }

  const businesses = remoteData.value

  const tags = [...new Set(businesses.flatMap((b) => b.tags))] as const

  const grouped = group(businesses, tags, (business, tag) => {
    return business.tags.includes(tag)
  })

  return (
    <section className="flex flex-col">
      <Hero />

      <section className="p-6">
        <GetRecommendations />

        <div className="h-8" />

        <div className="flex flex-col gap-8">
          {[...grouped.entries()].map(([name, businesses]) => {
            return (
              <BusinessList.Root key={name}>
                <BusinessList.Header>
                  <BusinessList.Title title={name} />
                  <BusinessList.Link href={`/search?tag=${name}`} />
                </BusinessList.Header>

                <BusinessList.Slider businesses={businesses} />
              </BusinessList.Root>
            )
          })}
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

  return map
}
