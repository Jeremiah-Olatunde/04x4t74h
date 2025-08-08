import type { ReactNode } from "react"
import { Link as WouterLink } from "wouter"
import { ChevronRight as IconChevronRight } from "lucide-react"

import * as Array from "Array"
import * as Function from "Function"

import { Icon } from "@/components/icon"

import { type BusinessDetails, Business } from "./card"

export function Root({ children }: { children: ReactNode }) {
  return <section className="flex flex-col gap-4">{children}</section>
}

export function Title({ title }: { title: string }) {
  return (
    <h2 className="capitalize font-sora text-neutral-700 font-medium ">
      {title}
    </h2>
  )
}

export function Header({ children }: { children: ReactNode }) {
  return (
    <header className="flex justify-between items-center">{children}</header>
  )
}

export function Slider({
  businesses,
}: {
  businesses: readonly BusinessDetails[]
}) {
  return (
    <div className="flex gap-2 overflow-x-scroll no-scrollbar">
      {Function.pipe(
        businesses,
        Array.map((business) => (
          <div key={business.id} className="w-60 shrink-0">
            <Business details={business} />
          </div>
        )),
      )}
    </div>
  )
}

export function Link({ href }: { href: string }) {
  return (
    <WouterLink href={href}>
      <div className="rounded-lg bg-neutral-100 p-2 flex justify-center items-center">
        <Icon
          size="sm"
          icon={IconChevronRight}
          label="see more budget friendly businesses"
        />
      </div>
    </WouterLink>
  )
}
