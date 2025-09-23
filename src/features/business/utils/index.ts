import type { Business } from "@/features/business/types"
import { get, groupBy, type Grouping } from "@/lib/record"

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

export function getAmenities(
  businesses: readonly Business[],
): readonly string[] {
  return get("amenities", businesses).flat(1)
}

export function getTags(businesses: readonly Business[]): readonly string[] {
  return get("tags", businesses).flat(1)
}

export function getCities(businesses: readonly Business[]): readonly string[] {
  return get("city", businesses)
}

export function getTowns(businesses: readonly Business[]): readonly string[] {
  return get("town", businesses)
}

export function getCategories(
  businesses: readonly Business[],
): readonly string[] {
  return get("category", businesses)
}

export function getPaymentOptions(
  businesses: readonly Business[],
): readonly string[] {
  return get("paymentOptions", businesses).flat(1)
}

export function getSubcategories(
  businesses: readonly Business[],
): readonly string[] {
  return get("subcategory", businesses)
}

export function getTownsInCity(
  businesses: readonly Business[],
  city: string,
): readonly string[] {
  const filtrate = getInCity(businesses, city)
  return getTowns(filtrate)
}

export function getCategoriesWithSubcategories(
  businesses: readonly Business[],
): Grouping<string> {
  const groups = groupByCategory(businesses)
  return groups.map(([c, b]) => [c, getSubcategories(b)])
}

export function getSubcategoriesInCategory(
  businesses: readonly Business[],
  category: string,
): readonly string[] {
  const filtrate = getInCategory(businesses, category)
  return getSubcategories(filtrate)
}

export function getCitiesWithTowns(
  businesses: readonly Business[],
): Grouping<string> {
  const groups = groupByCity(businesses)
  return groups.map(([c, b]) => [c, getTowns(b)])
}

export function getInCity(
  businesses: readonly Business[],
  city: string,
): readonly Business[] {
  return businesses.filter((business) => business.city === city)
}

export function getInTown(
  businesses: readonly Business[],
  town: string,
): readonly Business[] {
  return businesses.filter((business) => business.town === town)
}

export function getInCategory(
  businesses: readonly Business[],
  category: string,
): readonly Business[] {
  return businesses.filter((business) => business.category === category)
}

export function getWithTag(
  businesses: readonly Business[],
  tag: string,
): readonly Business[] {
  return businesses.filter((business) => business.tags.includes(tag))
}

export function getWithAmenity(
  businesses: readonly Business[],
  amenity: string,
): readonly Business[] {
  return businesses.filter((business) => business.amenities.includes(amenity))
}
