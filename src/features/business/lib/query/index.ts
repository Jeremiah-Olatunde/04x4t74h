import type { Business } from "@/features/business/types"
import { get } from "@/lib/record"

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
