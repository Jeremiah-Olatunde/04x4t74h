import {
  Heart as IconHeart,
  MapPin as IconMapPin,
  Star as IconStar,
} from "lucide-react"
import { Link as WouterLink } from "wouter"

import { Icon } from "@/components/icon"
import type { ReactNode } from "react"

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
      <Button />

      <WouterLink href={`#`}>
        <img
          src={details.logo}
          alt={`cover photo of ${details.name}`}
          className="rounded-t-xl"
        />

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

function Root({ children }: { children: ReactNode }) {
  return (
    <article className="w-full h-full relative rounded-xl border border-neutral-100">
      {children}
    </article>
  )
}

function Button() {
  return (
    <button type="button" className="absolute top-2 right-2 cursor-pointer">
      <div className="rounded-full p-2 flex justify-center items-center bg-red-400">
        {Math.random() < 0.5 ? (
          <IconHeart className="size-3 stroke-white" />
        ) : (
          <IconHeart className="size-3 stroke-white fill-white " />
        )}
      </div>
    </button>
  )
}

function Address({ town, city }: { town: string; city: string }) {
  return (
    <address className="flex justify-start items-center gap-1">
      <Icon size="xs" icon={IconMapPin} label="business location" />
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
