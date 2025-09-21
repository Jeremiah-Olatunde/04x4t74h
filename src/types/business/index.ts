import type { Review } from "@/types/review"
import type { Service } from "@/types/service"

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
type WeeklySchedule = readonly [
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
  openingHours: WeeklySchedule
}>

export type Business = BusinessLite & {
  reviews: readonly Review[]
  services: readonly Service[]
}

export type Businesses = readonly Business[]
export type BusinessesGrouped = readonly (readonly [string, Businesses])[]
export type Towns = readonly string[]
export type Cities = readonly [string, Towns][]
