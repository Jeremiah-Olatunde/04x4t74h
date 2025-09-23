import type { Business, Filter } from "@/features/business/types"

export function filter(
  businesses: readonly Business[],
  filter: Filter,
): readonly Business[] {
  return businesses.filter((business) => {
    if (filter.category) {
      const [category, subcategory] = filter.category

      if (business.category !== category) {
        return false
      }

      if (subcategory && business.subcategory !== subcategory) {
        return false
      }
    }

    if (filter.location) {
      const [city, towns] = filter.location

      if (business.city !== city) {
        return false
      }

      if (towns.size !== 0 && !towns.has(business.town)) {
        return false
      }
    }

    if (filter.tags.size !== 0 && filter.tags.isDisjointFrom(business.tags)) {
      return false
    }

    if (
      filter.amenities.size !== 0 &&
      filter.amenities.isDisjointFrom(business.amenities)
    ) {
      return false
    }

    if (
      filter.paymentOptions.size !== 0 &&
      filter.paymentOptions.isDisjointFrom(business.paymentOptions)
    ) {
      return false
    }

    return true
  })
}
