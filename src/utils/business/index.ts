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

export function get<K extends keyof V, V>(key: K, values: readonly V[]) {
  const items = values.map((value) => value[key])
  return new Set(items).values().toArray()
}

export function getCities(businesses: Businesses): readonly string[] {
  return get("city", businesses)
}

export function getTowns(businesses: Businesses): readonly string[] {
  return get("town", businesses)
}

export function getCategories(businesses: Businesses): readonly string[] {
  return get("businessCategory", businesses)
}

export function getTags(businesses: Businesses): readonly string[] {
  const items = businesses.flatMap((business) => business.tags)
  return new Set(items).values().toArray()
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
