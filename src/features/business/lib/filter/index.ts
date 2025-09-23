import type { Business, Filter } from "@/features/business/types"

export function apply(
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

      if (towns.length !== 0 && !towns.includes(business.town)) {
        return false
      }
    }

    if (filter.tags.length !== 0 && filter.tags.some(business.tags.includes)) {
      return false
    }

    if (
      filter.amenities.length !== 0 &&
      filter.amenities.some(business.amenities.includes)
    ) {
      return false
    }

    if (
      filter.paymentOptions.length !== 0 &&
      filter.paymentOptions.some(business.paymentOptions.includes)
    ) {
      return false
    }

    return true
  })
}

export function inCity(
  businesses: readonly Business[],
  city: string | readonly string[],
): readonly Business[] {
  return businesses.filter((business) => {
    if (typeof city === "string") {
      return business.city === city
    }

    return city.includes(business.city)
  })
}

export function inTown(
  businesses: readonly Business[],
  town: string | readonly string[],
): readonly Business[] {
  return businesses.filter((business) => {
    if (typeof town === "string") {
      return business.town === town
    }

    return town.includes(business.town)
  })
}

export function inCategory(
  businesses: readonly Business[],
  category: string | readonly string[],
): readonly Business[] {
  return businesses.filter((business) => {
    if (typeof category === "string") {
      return business.category === category
    }

    return category.includes(business.category)
  })
}

export function inSubcategory(
  businesses: readonly Business[],
  subcategory: string | readonly string[],
): readonly Business[] {
  return businesses.filter((business) => {
    if (typeof subcategory === "string") {
      return business.subcategory === subcategory
    }

    return subcategory.includes(business.subcategory)
  })
}

export function withTag(
  businesses: readonly Business[],
  tag: string | readonly string[],
): readonly Business[] {
  return businesses.filter((business) => {
    if (typeof tag === "string") {
      return business.tags.includes(tag)
    }

    return tag.some((tag) => business.tags.includes(tag))
  })
}

export function withAmenity(
  businesses: readonly Business[],
  amenity: string | readonly string[],
): readonly Business[] {
  return businesses.filter((business) => {
    if (typeof amenity === "string") {
      return business.amenities.includes(amenity)
    }

    return amenity.some((amenity) => business.amenities.includes(amenity))
  })
}
