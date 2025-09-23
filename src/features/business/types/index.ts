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
  openingHours: WeeklySchedule
}>

export type Business = BusinessLite & {
  reviews: readonly Review[]
  services: readonly Service[]
}

export type Filter = Readonly<{
  category: null | [category: string, subcategory: null | string]
  location: null | [city: string, town: readonly string[]]
  tags: string[]
  amenities: string[]
  paymentOptions: string[]
}>
