import type { Business } from "@/features/business/types"

export type Filter = {
  amenity: string[]
  tag: string[]
  paymentOption: string[]
} & ({ city: null } | { city: string; town: string[] }) &
  ({ category: null } | { category: string; subcategory: string[] })

export function fromParams(params: URLSearchParams): Filter {
  const city = params.get("city")
  const town = params.getAll("town")

  const category = params.get("category")
  const subcategory = params.getAll("subcategory")

  const amenity = params.getAll("amenity")
  const tag = params.getAll("tag")
  const paymentOption = params.getAll("paymentOption")

  const withTown = city === null ? { city } : { city, town }
  const withSubcategory =
    category === null ? { category } : { category, subcategory }

  return {
    amenity,
    tag,
    paymentOption,
    ...withTown,
    ...withSubcategory,
  } as const
}

export function predicate(filter: Filter): (business: Business) => boolean {
  return function (business: Business): boolean {
    if (
      filter.tag.length !== 0 &&
      filter.tag.some((tag) => business.tags.includes(tag))
    ) {
      return true
    }

    if (
      filter.amenity.length !== 0 &&
      filter.amenity.some((amenity) => business.amenities.includes(amenity))
    ) {
      return true
    }

    if (
      filter.paymentOption.length !== 0 &&
      filter.paymentOption.some((paymentOption) =>
        business.paymentOptions.includes(paymentOption),
      )
    ) {
      return true
    }

    if (filter.city !== null && business.city === filter.city) {
      if (0 === filter.town.length) return true
      return filter.town.includes(business.town)
    }

    if (filter.category !== null && business.category === filter.category) {
      if (0 === filter.subcategory.length) return true
      return filter.subcategory.includes(business.subcategory)
    }

    return false
  }
}

export function size(filter: Filter): number {
  const city = filter.city === null ? 0 : 1 + filter.town.length
  const category = filter.category === null ? 0 : 1 + filter.subcategory.length
  const amenity = filter.amenity.length
  const tag = filter.tag.length
  const paymentOption = filter.paymentOption.length

  return city + category + amenity + tag + paymentOption
}

export function apply(
  filter: Filter,
  businesses: readonly Business[],
): readonly Business[] {
  if (size(filter) === 0) return businesses
  return businesses.filter(predicate(filter))
}
