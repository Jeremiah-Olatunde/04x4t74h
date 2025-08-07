import {
  ChevronRight as IconChevronRight,
  Heart as IconHeart,
  MapPin as IconMapPin,
  Star as IconStar,
} from "lucide-react"
import { Toggle } from "radix-ui"
import { faker } from "@faker-js/faker"
import { Link as WouterLink } from "wouter"

import * as Array from "Array"

import { GetRecommendations } from "@/components/card"
import { Header } from "./header"
import { Icon } from "@/components/icon"

function business(): BusinessDetails {
  return {
    id: faker.string.uuid(),
    name: faker.company.name(),
    city: faker.location.city(),
    town: faker.location.county(),
    street: faker.location.street(),
    logo: "/images/business.jpg",
    rating:
      faker.number.int({ min: 3, max: 4 }) +
      faker.number.int({ min: 1, max: 9 }) / 10,
  }
}

export function Home() {
  const tags = [
    "Budget Friendly",
    "Plazzaa Picks",
    "Celebration",
    "Chill and Casual",
  ]

  return (
    <section className="flex flex-col">
      <Header />

      <section className="p-6">
        <GetRecommendations />

        <div className="h-8" />

        <div className="flex flex-col gap-8">
          {tags.map((tag) => {
            const businesses = Array.makeBy(3, business)

            return (
              <section key={tag}>
                <header className="flex justify-between items-center">
                  <h2 className="font-sora text-neutral-700 font-medium ">
                    {tag}
                  </h2>

                  <WouterLink href={"#"}>
                    <div className="rounded-lg bg-neutral-100 p-2 flex justify-center items-center">
                      <Icon
                        size="sm"
                        icon={IconChevronRight}
                        label="see more budget friendly businesses"
                      />
                    </div>
                  </WouterLink>
                </header>

                <div className="h-4" />

                <div className="flex gap-2 overflow-x-scroll no-scrollbar">
                  {businesses.map((business) => (
                    <div key={business.id} className="w-60 shrink-0">
                      <CardBusiness
                        saved={Math.random() < 0.5}
                        handleSave={() => {}}
                        business={business}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </section>
    </section>
  )
}

type BusinessDetails = {
  id: string
  name: string
  city: string
  street: string
  town: string
  logo: string
  rating: number
}

function CardBusiness({
  business,
  saved,
  handleSave,
}: {
  business: BusinessDetails
  saved: boolean
  handleSave: (saved: boolean) => void
}) {
  return (
    <article className="w-full h-full relative rounded-xl border border-neutral-100">
      <Toggle.Root
        className="absolute top-2 right-2 cursor-pointer"
        pressed={saved}
        onPressedChange={handleSave}
      >
        <div className="rounded-full p-2 flex justify-center items-center bg-red-400">
          <IconHeart
            className={`size-3 ${saved && "fill-white"} stroke-white`}
          />
        </div>
      </Toggle.Root>

      <WouterLink href={`#`}>
        <img
          src={business.logo}
          alt={`cover photo of ${business.name}`}
          className="rounded-t-xl"
        />

        <div className="px-4 pt-2 pb-4">
          <div className="flex gap-2 justify-between items-start">
            <p className="font-sora text-xxs text-neutral-400 font-light">
              (N15,000 to unlimited)
            </p>

            <div className="flex gap-1 items-center">
              <IconStar className="size-3 stroke-secondary fill-secondary" />
              <span className="font-sora text-xxs">{business.rating}</span>
            </div>
          </div>

          <div className="h-2" />

          <header>
            <h2 className="font-sora font-medium text-neutral-700 text-xs truncate">
              {business.name}
            </h2>
          </header>

          <div className="h-4" />

          <address className="flex justify-start items-center gap-1">
            <Icon
              size="xs"
              icon={IconMapPin}
              label={`location of ${business.name}`}
            />
            <span className="font-sora text-xxs text-neutral-400 font-light not-italic">
              {business.town}, {business.city}
            </span>
          </address>
        </div>
      </WouterLink>
    </article>
  )
}
