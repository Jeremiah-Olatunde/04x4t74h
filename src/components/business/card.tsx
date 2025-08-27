import type { ReactNode } from "react"
import { Link as WouterLink } from "wouter"
import { MapPin as IconMapPin, Star as IconStar } from "lucide-react"

import { Icon } from "@/components/icon"

export type BusinessDetails = {
  city: string
  id: string
  logo: string
  name: string
  rating: number
  street: string
  town: string
}

export function Business({ details }: { details: BusinessDetails }) {
  return (
    <Root>
      <WouterLink
        href={`/business/${details.id}/home/menu`}
        className="flex flex-col h-full w-full"
      >
        <div className="rounded-t-xl grow-1 bg-neutral-50">
          <img
            src={details.logo}
            alt={`cover photo of ${details.name}`}
            className="rounded-t-xl h-full w-full object-cover"
          />
        </div>

        <div className="p-4 pt-2">
          <div className="flex gap-2 justify-between items-start">
            <Budget />
            <Rating rating={details.rating} />
          </div>

          <Header title={details.name} />

          <div className="h-4" />

          <Address town={details.town} city={details.city} />
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
            <div className="h-4 w-30 bg-neutral-100 border-1 border-neutral-200 animate-pulse rounded-xs" />
            <div className="h-4 w-8 bg-neutral-100 border-1 border-neutral-200 animate-pulse rounded-xs" />
          </div>

          <div className="h-1" />

          <div className="h-4 w-2/3 bg-neutral-100 border-1 border-neutral-200 animate-pulse rounded-xs" />

          <div className="h-4" />

          <div className="h-4 w-30 bg-neutral-100 border-1 border-neutral-200 animate-pulse rounded-xs" />
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

function Address({ town, city }: { town: string; city: string }) {
  return (
    <address className="flex justify-start items-center gap-1">
      <Icon color="neutral" icon={IconMapPin} size="xs" />
      <span className="font-sora text-xxs text-neutral-400 font-light not-italic">
        {town}, {city}
      </span>
    </address>
  )
}

function Header({ title }: { title: string }) {
  return (
    <header>
      <h2 className="font-sora font-medium text-neutral-700 text-xs truncate">
        {title}
      </h2>
    </header>
  )
}

function Rating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 items-center">
      <IconStar className="size-3 stroke-secondary fill-secondary" />
      <span className="font-sora text-xxs">{rating}</span>
    </div>
  )
}

function Budget() {
  return (
    <p className="font-sora text-xxs text-neutral-400 font-light">
      (N15,000 to unlimited)
    </p>
  )
}

// function Button() {
//   return (
//     <button type="button" className="absolute top-2 right-2 cursor-pointer">
//       <div className="rounded-full p-2 flex justify-center items-center bg-red-400">
//         {Math.random() < 0.5 ? (
//           <IconHeart className="size-3 stroke-white" />
//         ) : (
//           <IconHeart className="size-3 stroke-white fill-white " />
//         )}
//       </div>
//     </button>
//   )
// }
