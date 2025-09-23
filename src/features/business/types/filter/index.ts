export type Filter = Readonly<{
  category: null | readonly [category: string, subcategory: null | string]
  location: null | readonly [city: string, town: Readonly<Set<string>>]
  tags: Readonly<Set<string>>
  amenities: Readonly<Set<string>>
  paymentOptions: Readonly<Set<string>>
}>
