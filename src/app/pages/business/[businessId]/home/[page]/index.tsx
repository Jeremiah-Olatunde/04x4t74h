import { useLocation, useParams } from "wouter"
import { Tabs } from "@base-ui-components/react/tabs"

import type { BusinessWithReviewsAndServices } from "@/types/business"
import { LoadingScreen } from "@/components/loading"
import { useBusinessesWithReviewsAndServices } from "@/hooks/business"
import * as RemoteData from "@/lib/remote-data"
import {
  CircleUserRoundIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  PiggyBankIcon,
  StarIcon,
} from "lucide-react"
import { Icon } from "@/components/icon"
import type { Service } from "@/types/service"
import type { Review } from "@/types/review"
import { PathParameterError } from "@/api/errors"
import { LinkBack, LinkText } from "@/components/link"

export function Business() {
  const { businessId } = useParams()

  if (businessId === undefined) {
    const tag = "missing"
    const details = { tag } as const
    const parameter = "businessId"
    const schema = "/business/:businessId/home/:page"
    throw new PathParameterError(parameter, schema, details)
  }

  const remoteData = useBusinessesWithReviewsAndServices(businessId)

  if (RemoteData.isInitial(remoteData) || RemoteData.isPending(remoteData)) {
    return <LoadingScreen />
  }

  if (RemoteData.isFailure(remoteData)) {
    throw remoteData.error
  }

  const business = remoteData.value

  return (
    <section className="">
      <Hero business={business} />
      <Kakashi business={business} />
    </section>
  )
}

type HeroProps = {
  business: BusinessWithReviewsAndServices
}

function Hero({ business }: HeroProps) {
  return (
    <section className="flex flex-col gap-6 p-6">
      <div className="relative">
        <div className="absolute top-2 left-2">
          <LinkBack href="/home" />
        </div>

        <div className="h-62 rounded-t-xl grow-1 bg-neutral-50">
          <img
            src={business.logo}
            alt={`cover photo of ${business.name}`}
            className="h-full rounded-xl border-1 border-neutral-300 -z-10"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <header>
          <h1 className="font-sora text-neutral-700 font-bold">
            {business.name}
          </h1>
        </header>
        <ul className="flex flex-col gap-2">
          <li className="flex flex-row gap-2 items-center">
            <Icon icon={MapPinIcon} color="neutral" size="sm" />
            <span className="font-sora text-xs text-neutral-400">
              {business.street} {business.town}
            </span>
          </li>
          <li className="flex flex-row gap-2 items-center">
            <Icon icon={ClockIcon} color="neutral" size="sm" />
            <span className="font-sora text-xs text-green-500 font-medium">
              Open
            </span>
            <span className="font-sora text-xs text-neutral-400">
              07:00 &mdash; 21:00
            </span>
          </li>
          <li className="flex flex-row gap-2 items-center">
            <Icon icon={PiggyBankIcon} color="neutral" size="sm" />
            <span className="font-sora text-xs text-neutral-400">
              ₦15,000 to unlimited
            </span>
          </li>
        </ul>
        <div className="flex gap-2 items-center justify-start">
          <ul className="flex gap-1">
            {Array(Math.round(business.rating))
              .fill(0)
              .map((_, index) => (
                <StarIcon
                  key={index}
                  className="text-secondary fill-secondary size-4"
                />
              ))}
          </ul>
          <div className="font-sora text-xs text-neutral-400 font-medium">
            {business.rating}
            &nbsp; &middot; &nbsp;
            {business.reviews.length} Reviews
          </div>
          <LinkText href={`/business/${business.id}/reviews/create`}>
            Leave a Review
          </LinkText>
        </div>
      </div>
    </section>
  )
}

type KakashiProps = { business: BusinessWithReviewsAndServices }

function Kakashi({ business }: KakashiProps) {
  const { page } = useParams()
  const [_, setLocation] = useLocation()

  const isMenu = page === "menu"
  const isReviews = page === "reviews"
  const isInfo = page === "info"

  if (page === undefined) {
    const tag = "missing"
    const details = { tag } as const
    const parameter = "page"
    const schema = "/business/:id/home/:page"
    throw new PathParameterError(parameter, schema, details)
  }

  if (!(isMenu || isReviews || isInfo)) {
    const value = page
    const tag = "invalid"
    const details = { tag, value } as const
    const parameter = "page"
    const schema = "/business/:id/home/:page"
    throw new PathParameterError(parameter, schema, details)
  }

  return (
    <section>
      <Tabs.Root
        value={page}
        onValueChange={(page) => {
          setLocation(`/business/${business.id}/home/${page}`)
        }}
      >
        <Tabs.List className="px-8 py-4 border-b-1 border-neutral-200 flex justify-start gap-12">
          <Tabs.Tab
            value="menu"
            className={`font-sora text-neutral-400 text-xs ${page === "menu" && "font-semibold text-neutral-700"}`}
          >
            Menu
          </Tabs.Tab>
          <Tabs.Tab
            value="reviews"
            className={`font-sora text-neutral-400 text-xs ${page === "reviews" && "font-semibold text-neutral-700"}`}
          >
            Reviews
          </Tabs.Tab>
          <Tabs.Tab
            value="info"
            className={`font-sora text-neutral-400 text-xs ${page === "info" && "font-semibold text-neutral-700"}`}
          >
            Information
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="menu">
          <Menu services={business.services} />
        </Tabs.Panel>

        <Tabs.Panel value="reviews">
          <Reviews reviews={business.reviews} />
        </Tabs.Panel>

        <Tabs.Panel value="info">
          <Information telephone={business.telephone} />
        </Tabs.Panel>
      </Tabs.Root>
    </section>
  )
}

type MenuProps = { services: readonly Service[] }

function Menu({ services }: MenuProps) {
  return (
    <ul className="flex flex-col">
      {services.slice(0, 5).map((service, index) => {
        return (
          <li key={index} className="border-b-1 border-neutral-300">
            <article className="px-8 py-4 flex flex-col gap-2">
              <h2 className="font-sora text-neutral-700 font-semibold text-sm">
                {service.name}
              </h2>
              <p className="font-sora text-neutral-400 text-xs">
                {service.description}
              </p>
              <div className="font-sora text-neutral-600 text-xs font-semibold">
                {service.priceSpecification.priceCurrency}{" "}
                {service.priceSpecification.price}
              </div>
            </article>
          </li>
        )
      })}
    </ul>
  )
}

type ReviewsProps = { reviews: readonly Review[] }

function Reviews({ reviews }: ReviewsProps) {
  return (
    <ul className="flex flex-col">
      {reviews
        .toSorted((a, b) => b.reviewRating - a.reviewRating)
        .slice(0, 5)
        .map((review, index) => {
          return (
            <li key={index} className="border-b-1 border-neutral-300">
              <article className="px-8 py-4 flex flex-col gap-3">
                <div className="flex flex-row gap-4 items-start">
                  <div className="aspect-square">
                    <CircleUserRoundIcon className="text-neutral-300 size-10 stroke-1" />
                  </div>
                  <div className="flex flex-col gap-1 grow-1">
                    <h2 className="font-sora text-neutral-700 font-semibold text-sm">
                      {review.reviewer.name}
                    </h2>
                    <ul className="flex gap-1">
                      {Array(Math.round(review.reviewRating))
                        .fill(0)
                        .map((_, index) => (
                          <li key={index}>
                            <StarIcon className="text-secondary fill-secondary size-3" />
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="text-xs font-sora text-neutral-400">
                    {formatDate(review.createdOn)}
                  </div>
                </div>
                <p className="font-sora text-neutral-400 text-xs font-light">
                  {review.reviewBody}
                </p>
              </article>
            </li>
          )
        })}
    </ul>
  )
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)

  const day = "2-digit"
  const month = "2-digit"
  const year = "numeric"
  const options = { day, month, year } as const

  const formatter = new Intl.DateTimeFormat("en-GB", options)
  return formatter.format(date)
}

type InformationProps = { telephone: string }

function Information({ telephone }: InformationProps) {
  return (
    <section className="px-8 py-6 flex flex-col gap-6">
      <header>
        <h2 className="font-sora text-neutral-700 font-medium">
          Contact Information
        </h2>
        <p className="font-sora text-neutral-400 text-xs">
          Get in touch or connect with us online
        </p>
      </header>

      <div className="flex flex-col gap-6">
        <div className="flex flex-row gap-4 items-center">
          <div className="bg-primary/10 rounded-xl p-3">
            <PhoneIcon className="text-primary fill-primary size-4" />
          </div>
          <div className="flex flex-col gap-1 grow-1">
            <span className="font-sora text-sm font-medium text-neutral-700">
              Phone
            </span>
            <span className="font-sora text-neutral-400 text-xs">
              {telephone}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
