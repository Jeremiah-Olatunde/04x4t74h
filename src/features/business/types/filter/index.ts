export type Filter = Readonly<{
  category: null | readonly [category: string, subcategory: null | string]
  location: null | readonly [city: string, town: readonly string[]]
  tags: readonly string[]
  amenities: readonly string[]
  paymentOptions: readonly string[]
}>
