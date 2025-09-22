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

export type Businesses = readonly Business[]
export type BusinessesGrouped = GroupTree<Business>
export type Towns = readonly string[]
export type Cities = GroupTree<string>

export type GroupLeaf<T> = T
export type GroupNode<T> = readonly [string, readonly GroupLeaf<T>[]]
export type GroupTree<T> = readonly GroupNode<T>[]
