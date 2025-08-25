import type { Review } from "@/types/review"
import type { Service } from "@/types/service"

export type Business = Readonly<{
  amenities: readonly string[]
  businessCategory: string
  businessSubCategory: readonly string[]
  city: string
  description: string
  id: string
  logo: string
  name: string
  paymentOptions: readonly string[]
  rating: number
  street: string
  telephone: string
  tags: readonly string[]
  town: string
}>

export type BusinessWithReviewsAndServices = Business & {
  reviews: readonly Review[]
  services: readonly Service[]
}
