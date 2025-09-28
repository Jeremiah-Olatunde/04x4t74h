import { groupBy, type Grouping } from "@/lib/record"
import type { Business } from "@/features/business/types"

export function groupByCity(
  businesses: readonly Business[],
): Grouping<Business> {
  return groupBy(businesses, "city")
}

export function groupByTown(
  businesses: readonly Business[],
): Grouping<Business> {
  return groupBy(businesses, "town")
}

export function groupByCategory(
  businesses: readonly Business[],
): Grouping<Business> {
  return groupBy(businesses, "category")
}

export function groupByTag(
  businesses: readonly Business[],
): Grouping<Business> {
  return groupBy(businesses, "tags")
}

export function groupByAmenity(
  businesses: readonly Business[],
): Grouping<Business> {
  return groupBy(businesses, "amenities")
}
