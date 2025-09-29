export type Name =
  | "amenity"
  | "category"
  | "city"
  | "paymentOption"
  | "subcategory"
  | "tag"
  | "town"

export function set(
  params: URLSearchParams,
  name: Name,
  value: readonly string[],
): URLSearchParams {
  if (name === "city" && 1 < value.length) {
    const message = "[filter]: multiple cities provided"
    throw new Error(message)
  }

  if (name === "category" && 1 < value.length) {
    const message = "[filter]: multiple categories provided"
    throw new Error(message)
  }

  const clone = new URLSearchParams(params)
  const cleared = clear(clone, name)
  value.forEach((item) => cleared.append(name, item))
  return cleared
}

export function clear(params: URLSearchParams, name: Name): URLSearchParams {
  const clone = new URLSearchParams(params)

  if (name === "city") {
    clone.delete("city")
    clone.delete("town")
    return clone
  }

  if (name === "category") {
    clone.delete("category")
    clone.delete("subcategory")
    return clone
  }

  clone.delete(name)
  return clone
}

export function reset(params: URLSearchParams): URLSearchParams {
  const clone = new URLSearchParams(params)
  clone.delete("tag")
  clone.delete("amenity")
  clone.delete("paymentOption")
  clone.delete("city")
  clone.delete("town")
  clone.delete("category")
  clone.delete("subcategory")
  return clone
}

export function enumerate(
  params: URLSearchParams,
): readonly (readonly [string, string])[] {
  return [
    "category",
    "subcategory",
    "tag",
    "city",
    "town",
    "amenity",
    "paymentOption",
  ].flatMap((name) => {
    const rename = name === "paymentOption" ? "payment" : name
    return params.getAll(name).map((_) => [rename, _] as const)
  })
}
