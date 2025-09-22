import { Link as LinkWouter } from "wouter"
import { MapPinIcon, StarIcon } from "lucide-react"

import type { Business } from "@/types/business"

type SmallProps = { business: Business }

export function Small({ business }: SmallProps) {
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "decimal",
    minimumFractionDigits: 1,
  })

  return (
    <article className="w-full h-full relative rounded-xl border border-neutral-100">
      <LinkWouter href={`/business/${business.id}/home/menu`}>
        <div className="flex flex-col h-full w-full">
          <div className="rounded-t-xl grow-1 min-h-0 w-full bg-neutral-50">
            <img
              src={business.logo}
              alt={`cover photo of ${business.name}`}
              className="rounded-t-xl h-full w-full object-cover block"
            />
          </div>

          <div className="p-4 pt-2">
            <div className="flex flex-row justify-between items-center gap-2">
              <p className="text-xxs font-sora text-neutral-400 font-light truncate">
                (N15,000 to unlimited)
              </p>

              <div className="flex gap-1 items-center">
                <StarIcon className="size-3 stroke-secondary fill-secondary" />
                <span className="text-xxs font-semibold font-sora">
                  {formatter.format(business.rating)}
                </span>
              </div>
            </div>

            <div className="h-1" />

            <header>
              <h2 className="text-xs font-sora font-medium text-neutral-700 truncate">
                {business.name}
              </h2>
            </header>

            <div className="h-4" />

            <address className="flex justify-start items-center gap-1">
              <MapPinIcon className="text-neutral-400 size-3" />
              <span className="text-xxs font-sora  text-neutral-400 font-light not-italic truncate">
                {business.town}, {business.city}
              </span>
            </address>
          </div>
        </div>
      </LinkWouter>
    </article>
  )
}
