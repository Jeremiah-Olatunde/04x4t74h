export type Service = Readonly<{
  id: string
  name: string
  description: string
  priceSpecification: Readonly<{
    price: number
    priceCurrency: string
  }>
}>
