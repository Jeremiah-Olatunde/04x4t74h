import Zod from "zod/v4"

function hasNoDuplicates<T>(value: T[]): boolean {
  return new Set(value).size === value.length
}

export const Business = Zod.object({
  id: Zod.uuid(),
  category: Zod.string(),
  description: Zod.string(),
  subcategory: Zod.string(),
  name: Zod.string(),
  street: Zod.string(),
  telephone: Zod.string(),
  town: Zod.string(),
  city: Zod.string(),
  logo: Zod.string(),
  rating: Zod.number(),
  amenities: Zod.array(Zod.string())
    .refine(hasNoDuplicates, { message: "Duplicate values found" })
    .transform((value) => new Set(value)),
  paymentOptions: Zod.array(Zod.string())
    .refine(hasNoDuplicates, { message: "Duplicate values found" })
    .transform((value) => new Set(value)),
  tags: Zod.array(Zod.string())
    .refine(hasNoDuplicates, { message: "Duplicate values found" })
    .transform((value) => new Set(value)),
  reviews: Zod.array(
    Zod.object({
      id: Zod.uuid(),
      createdOn: Zod.string(),
      reviewBody: Zod.string(),
      reviewRating: Zod.number(),
      reviewer: Zod.object({
        name: Zod.string(),
        email: Zod.string(),
        telephone: Zod.string(),
      }),
    }),
  ),
  services: Zod.array(
    Zod.object({
      id: Zod.uuid(),
      name: Zod.string(),
      description: Zod.string(),
      priceSpecification: Zod.object({
        price: Zod.number(),
        priceCurrency: Zod.string(),
      }),
    }),
  ),
})
