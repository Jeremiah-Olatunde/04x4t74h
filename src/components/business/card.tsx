import type { ReactNode } from "react"
import { Link as WouterLink } from "wouter"
import { MapPin as IconMapPin, Star as IconStar } from "lucide-react"

import { Icon } from "@/components/icon"

type CardSize = { size: "sm" | "lg" }

export type BusinessDetails = {
  city: string
  id: string
  logo: string
  name: string
  rating: number
  street: string
  town: string
}

type BusinessProps = { details: BusinessDetails; size: "sm" | "lg" }

export function Business({ details, size }: BusinessProps) {
  return (
    <Root>
      <WouterLink
        href={`/business/${details.id}/home/menu`}
        className="flex flex-col h-full w-full"
      >
        <div className="rounded-t-xl grow-1 min-h-0 w-full bg-neutral-50">
          <img
            src={details.logo}
            alt={`cover photo of ${details.name}`}
            className="rounded-t-xl h-full w-full object-cover block"
          />
        </div>

        <div className={size === "sm" ? `p-4 pt-2` : `p-6 pt-4`}>
          <div className="flex gap-2 justify-between items-start">
            <Budget size={size} />
            <Rating rating={details.rating} size={size} />
          </div>

          <Header title={details.name} size={size} />

          <div className="h-4" />

          <Address town={details.town} city={details.city} size={size} />
        </div>
      </WouterLink>
    </Root>
  )
}

export function BusinessSkeleton() {
  return (
    <Root>
      <div className="w-full rounded-xl"></div>
      <div className="flex flex-col h-full w-full">
        <div className="rounded-t-xl grow-1 bg-neutral-100 border-b-1 border-neutral-200 animate-pulse"></div>

        <div className="p-4 pt-2">
          <div className="flex gap-2 justify-between items-start">
            <div className="h-3 w-24 bg-neutral-100 border-1 border-neutral-200 animate-pulse rounded-xs" />
            <div className="h-3 w-8 bg-neutral-100 border-1 border-neutral-200 animate-pulse rounded-xs" />
          </div>

          <div className="h-1" />

          <div className="h-4 w-2/3 bg-neutral-100 border-1 border-neutral-200 animate-pulse rounded-xs" />

          <div className="h-4" />

          <div className="h-3 w-30 bg-neutral-100 border-1 border-neutral-200 animate-pulse rounded-xs" />
        </div>
      </div>
    </Root>
  )
}

function Root({ children }: { children: ReactNode }) {
  return (
    <article className="w-full h-full relative rounded-xl border border-neutral-100">
      {children}
    </article>
  )
}

type AddressProps = CardSize & { town: string; city: string }
function Address({ town, city, size }: AddressProps) {
  return (
    <address className="flex justify-start items-center gap-1">
      <Icon color="neutral" icon={IconMapPin} size="xs" />
      <span
        className={`
          ${size === "sm" ? "text-xxs" : "text-xs"}
          font-sora  text-neutral-400 font-light not-italic
        `}
      >
        {town}, {city}
      </span>
    </address>
  )
}

type HeaderProps = CardSize & { title: string }
function Header({ title, size }: HeaderProps) {
  return (
    <header>
      <h2
        className={`
          ${size === "sm" ? "text-xs" : "text-sm"}
          font-sora font-medium text-neutral-700  truncate
        `}
      >
        {title}
      </h2>
    </header>
  )
}

type RatingProps = CardSize & { rating: number }
function Rating({ rating, size }: RatingProps) {
  return (
    <div className="flex gap-1 items-center">
      <IconStar
        className={`${size === "sm" ? "size-3" : "size-4"} stroke-secondary fill-secondary`}
      />
      <span className={`${size === "sm" ? "text-xxs" : "text-xs"} font-sora`}>
        {rating}
      </span>
    </div>
  )
}

type BudgetProps = CardSize
function Budget({ size }: BudgetProps) {
  return (
    <p
      className={`
        ${size === "sm" ? "text-xxs" : "text-xs"}
        font-sora text-neutral-400 font-light
      `}
    >
      (N15,000 to unlimited)
    </p>
  )
}
