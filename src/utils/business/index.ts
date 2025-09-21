import type {
  Businesses,
  Cities,
  BusinessesGrouped,
  Towns,
} from "@/types/business"
import Fuse from "fuse.js"

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

export function groupBy<K extends string, T extends Record<K, string>>(
  items: readonly T[],
  key: K,
) {
  const groups = get(key, items)
  return group(items, groups, (item, group) => item[key] === group)
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

export function getAmenities(businesses: Businesses): readonly string[] {
  const items = businesses.flatMap((business) => business.amenities)
  return new Set(items).values().toArray()
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

export function groupByCity(businesses: Businesses): BusinessesGrouped {
  return groupBy(businesses, "city")
}

export function groupByTown(businesses: Businesses): BusinessesGrouped {
  return groupBy(businesses, "town")
}

export function groupByCategory(businesses: Businesses): BusinessesGrouped {
  return groupBy(businesses, "businessCategory")
}

export function groupByTag(businesses: Businesses): BusinessesGrouped {
  const tags = getTags(businesses)
  return group(businesses, tags, (b, tag) => b.tags.includes(tag))
}

export function getInCity(businesses: Businesses, city: string): Businesses {
  const grouped = groupByCity(businesses)
  const found = grouped.find(([c]) => c === city)
  return found ? found[1] : []
}

export function getInTown(businesses: Businesses, town: string): Businesses {
  const grouped = groupByTown(businesses)
  const found = grouped.find(([c]) => c === town)
  return found ? found[1] : []
}

export function getInCategory(
  businesses: Businesses,
  category: string,
): Businesses {
  const grouped = groupByCategory(businesses)
  const found = grouped.find(([c]) => c === category)
  return found ? found[1] : []
}

export function getWithTag(businesses: Businesses, tag: string): Businesses {
  const grouped = groupByTag(businesses)
  const found = grouped.find(([c]) => c === tag)
  return found ? found[1] : []
}

export function search(businesses: Businesses, term: string): Businesses {
  if (term === "") return businesses

  const keys = ["name"]
  const threshold = 0.4
  const fuse = new Fuse(businesses, { keys, threshold })
  const results = fuse.search(term)

  return results.map((result) => result.item)
}
