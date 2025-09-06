import type { Business } from "@/types/business"

type Businesses = readonly Business[]
type Towns = readonly string[]
type Cities = readonly [string, Towns][]

export function group<T>(
  items: readonly T[],
  groups: readonly string[],
  belongs: (item: T, group: string) => boolean,
): readonly (readonly [string, readonly T[]])[] {
  const map: Map<string, T[]> = new Map(groups.map((g) => [g, []]))

  for (const group of groups) {
    for (const item of items) {
      if (belongs(item, group)) map.get(group)?.push(item)
    }
  }

  return map.entries().toArray()
}

export function getCities(businesses: Businesses): readonly string[] {
  const cities = businesses.map((business) => business.city)
  return new Set(cities).values().toArray()
}

export function getCitiesWithTowns(bs: Businesses): Cities {
  const cities = getCities(bs)
  const byCity = group(bs, cities, (b, city) => b.city === city)

  const withTowns: Cities = byCity.map(([city, bs]) => {
    const towns: Towns = bs.map((b) => b.town)
    return [city, towns] as const
  })

  return withTowns
}
