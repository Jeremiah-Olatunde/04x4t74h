export type Filter = Readonly<{
  category: null | [category: string, subcategory: null | string]
  location: null | [city: string, town: readonly string[]]
  tags: string[]
  amenities: string[]
  paymentOptions: string[]
}>
