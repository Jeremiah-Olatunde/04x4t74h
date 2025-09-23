export type Grouping<T> = readonly (readonly [string, readonly T[]])[]

export function group<T>(
  items: readonly T[],
  groups: readonly string[],
  belongs: (item: T, group: string) => boolean,
): Grouping<T> {
  const map: Map<string, T[]> = new Map(groups.map((g) => [g, []]))

  for (const group of groups) {
    for (const item of items) {
      if (belongs(item, group)) map.get(group)?.push(item)
    }
  }

  return map.entries().toArray()
}

export function groupBy<
  K extends string,
  T extends Record<K, string | readonly string[]>,
>(items: readonly T[], key: K) {
  const groups = get(key, items).flat(1)
  return group(items, groups, (item, group) => item[key] === group)
}

export function get<K extends keyof V, V>(key: K, values: readonly V[]) {
  const items = values.map((value) => value[key])
  return new Set(items).values().toArray()
}
