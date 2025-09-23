import type { Business, Filter } from "@/features/business/types"

export function filter(
  businesses: readonly Business[],
  filter: Filter,
): readonly Business[] {
  return businesses.filter((business) => {
    if (filter.category) {
      const [category, subcategory] = filter.category
      if (business.category !== category) return false
      if (subcategory && business.subcategory !== subcategory) return false
    }

    if (filter.location) {
      const [city, towns] = filter.location
      if (business.city !== city) return false
      if (towns.length !== 0 && !towns.includes(business.town)) return false
    }

    if (filter.tags.length !== 0 && !filter.tags.some(business.tags.includes)) {
      return false
    }

    if (
      filter.amenities.length !== 0 &&
      !filter.amenities.some(business.amenities.includes)
    ) {
      return false
    }

    if (
      filter.paymentOptions.length !== 0 &&
      !filter.paymentOptions.some(business.paymentOptions.includes)
    ) {
      return false
    }

    return true
  })
}
