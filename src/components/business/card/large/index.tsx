import { Link as LinkWouter } from "wouter"
import type { Business } from "@/types/business"
import { MapPinIcon, StarIcon } from "lucide-react"

type LargeProps = { business: Business }

export function Large({ business }: LargeProps) {
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "decimal",
    minimumFractionDigits: 1,
  })

  return (
    <li>
      <article className="w-full h-90 relative rounded-xl border border-neutral-100">
        <LinkWouter href={`/business/${business.id}/home/menu`}>
          <div className="flex flex-col h-full w-full">
            <div className="rounded-t-xl grow-1 min-h-0 w-full bg-neutral-50">
              <img
                src={business.logo}
                alt={`cover photo of ${business.name}`}
                className="rounded-t-xl h-full w-full object-cover block"
              />
            </div>

            <div className="p-6 pt-4">
              <div className="flex flex-row justify-between items-center">
                <p className="text-xs font-sora text-neutral-400 font-light">
                  (N15,000 to unlimited)
                </p>

                <div className="flex gap-1 items-center">
                  <StarIcon className="size-4 stroke-secondary fill-secondary" />
                  <span className="text-xs font-semibold font-sora">
                    {formatter.format(business.rating)}
                  </span>
                </div>
              </div>

              <div className="h-2" />

              <header>
                <h2 className="text-sm font-sora font-medium text-neutral-700 truncate">
                  {business.name}
                </h2>
              </header>

              <div className="h-6" />

              <address className="flex justify-start items-center gap-1">
                <MapPinIcon className="text-neutral-600 size-4" />
                <span className="text-xs font-sora  text-neutral-400 font-light not-italic">
                  {business.town}, {business.city}
                </span>
              </address>
            </div>
          </div>
        </LinkWouter>
      </article>
    </li>
  )
}
