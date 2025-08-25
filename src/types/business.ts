import type { Review } from "./review"
import type { Service } from "./service"

export type Business = Readonly<{
  amenities: Readonly<Record<"name", string>[]>
  businessCategory: readonly string[]
  businessSubCategory: readonly string[]
  city: string
  description: string
  id: string
  name: string
  paymentOptions: readonly string[]
  street: string
  telephone: string
  themes: Readonly<Record<"name", string>[]>
  town: string
  logo: string
}>

export type BusinessWithReviewsAndServices = Business & {
  reviews: readonly Review[]
  services: readonly Service[]
}
