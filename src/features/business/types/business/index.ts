export type Review = Readonly<{
  id: string
  createdOn: string
  reviewBody: string
  reviewRating: number
  reviewer: Readonly<Record<"name" | "email" | "telephone", string>>
}>

export type Service = Readonly<{
  id: string
  name: string
  description: string
  priceSpecification: Readonly<{
    price: number
    priceCurrency: string
  }>
}>

type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY"

type OperatingWindow = Readonly<Record<"opens" | "closes", string>>
type DailySchedule<D extends DayOfWeek> = Readonly<
  OperatingWindow & Record<"dayOfWeek", D>
>
export type WeeklySchedule = readonly [
  DailySchedule<"MONDAY">,
  DailySchedule<"TUESDAY">,
  DailySchedule<"WEDNESDAY">,
  DailySchedule<"THURSDAY">,
  DailySchedule<"FRIDAY">,
  DailySchedule<"SATURDAY">,
  DailySchedule<"SUNDAY">,
]

export type BusinessLite = Readonly<{
  amenities: readonly string[]
  category: string
  subcategory: string
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

export type Business = BusinessLite & {
  reviews: readonly Review[]
  services: readonly Service[]
}
