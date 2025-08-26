import { useParams } from "wouter"

import { PathParameterError } from "@/api/errors"
import { useBusinessesWithReviewsAndServices } from "@/hooks/business"
import { LinkBack } from "@/components/link"
import type { Business } from "@/types/business"
import * as RemoteData from "@/lib/remote-data"
import type { ReactNode } from "react"
import { Icon } from "@/components/icon"
import { MapPinIcon, ClockIcon, PiggyBankIcon } from "lucide-react"

export function ReviewCreate() {
  const { businessId } = useParams()

  if (businessId === undefined) {
    const tag = "missing"
    const details = { tag } as const
    const parameter = "id"
    const schema = "/business/:id"
    throw new PathParameterError(parameter, schema, details)
  }

  const remoteData = useBusinessesWithReviewsAndServices(businessId)

  return (
    <section className="px-6 py-8 flex flex-col gap-8">
      <header className="relative flex justify-center items-center gap-4">
        <div className="absolute left-0 top-1/2 -translate-y-1/2">
          <LinkBack href={`~/business/${businessId}/home/menu`} />
        </div>
        <h1 className="font-sora text-xl text-neutral-700 font-bold">
          Leave a Review
        </h1>
      </header>

      {RemoteData.fold3(remoteData, {
        onFailure: (error): ReactNode => {
          throw error
        },
        onNone: (): ReactNode => {
          return <BusinessDetailsSkeleton />
        },
        onSuccess: (business): ReactNode => {
          return <BusinessDetails business={business} />
        },
      })}

      <ReviewCreateForm />
    </section>
  )
}

function BusinessDetailsSkeleton() {
  return (
    <div className="p-4 border-1 border-neutral-100 h-38 w-full rounded-xl flex gap-4">
      <div className="h-full w-40 rounded-xl bg-neutral-100 border-neutral-200 border-1 animate-pulse" />
      <div className="grow-1 flex flex-col gap-2">
        <div className="w-1/2 h-6 bg-neutral-100 border-neutral-200 border-1 rounded-md animate-pulse" />
        <div className="w-full h-6 bg-neutral-100 border-neutral-200 border-1 rounded-md animate-pulse" />
        <div className="w-full h-6 bg-neutral-100 border-neutral-200 border-1 rounded-md animate-pulse" />
        <div className="w-full h-6 bg-neutral-100 border-neutral-200 border-1 rounded-md animate-pulse" />
      </div>
    </div>
  )
}

type BusinessDetailsProps = { business: Business }
function BusinessDetails({ business }: BusinessDetailsProps) {
  return (
    <div className="p-4 border-1 border-neutral-100 bg-neutral-50 w-full rounded-xl flex gap-4">
      <div className="w-40 rounded-xl bg-neutral-300 border-neutral-300 border-1">
        <img src={business.logo} className="h-full w-full rounded-xl" />
      </div>

      <div className="grow-1 flex flex-col gap-2">
        <span className="font-sora font-bold text-xs">{business.name}</span>
        <ul className="flex flex-col gap-2">
          <li className="flex flex-row gap-2 items-center">
            <div className="self-start">
              <Icon icon={MapPinIcon} color="neutral" size="sm" />
            </div>
            <span className="font-sora text-xxs text-neutral-400">
              {business.street} {business.town}
            </span>
          </li>
          <li className="flex flex-row gap-2 items-center">
            <div className="self-start">
              <Icon icon={ClockIcon} color="neutral" size="sm" />
            </div>
            <span className="font-sora text-xxs text-green-500 font-medium">
              Open
            </span>
            <span className="font-sora text-xxs text-neutral-400">
              07:00 &mdash; 21:00
            </span>
          </li>
          <li className="flex flex-row gap-2 items-center">
            <div className="self-start">
              <Icon icon={PiggyBankIcon} color="neutral" size="sm" />
            </div>
            <span className="font-sora text-xxs text-neutral-400">
              ₦15,000 to unlimited
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}

type ReviewCreateFormProps = {}
function ReviewCreateForm({}: ReviewCreateFormProps) {
  return <form></form>
}
