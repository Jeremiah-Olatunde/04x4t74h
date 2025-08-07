import {
  Heart as IconHeart,
  MapPin as IconMapPin,
  Star as IconStar,
} from "lucide-react"
import { Toggle } from "radix-ui"
import { Link as WouterLink } from "wouter"

import { Icon } from "@/components/icon"

type BusinessDetails = {
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
    <article className="w-full h-full relative rounded-xl border border-neutral-100">
      <Toggle.Root
        className="absolute top-2 right-2 cursor-pointer"
        pressed={false}
        disabled={false}
        onPressedChange={(_pressed) => {}}
      >
        <div className="rounded-full p-2 flex justify-center items-center bg-red-400">
          {Math.random() < 0.5 ? (
            <IconHeart className="size-3 stroke-white" />
          ) : (
            <IconHeart className="size-3 stroke-white fill-white " />
          )}
        </div>
      </Toggle.Root>

      <WouterLink href={`#`}>
        <img
          src={details.logo}
          alt={`cover photo of ${details.name}`}
          className="rounded-t-xl"
        />

        <div className="px-4 pt-2 pb-4">
          <div className="flex gap-2 justify-between items-start">
            <p className="font-sora text-xxs text-neutral-400 font-light">
              (N15,000 to unlimited)
            </p>

            <div className="flex gap-1 items-center">
              <IconStar className="size-3 stroke-secondary fill-secondary" />
              <span className="font-sora text-xxs">{details.rating}</span>
            </div>
          </div>

          <div className="h-2" />

          <header>
            <h2 className="font-sora font-medium text-neutral-700 text-xs truncate">
              {details.name}
            </h2>
          </header>

          <div className="h-4" />

          <address className="flex justify-start items-center gap-1">
            <Icon
              size="xs"
              icon={IconMapPin}
              label={`location of ${details.name}`}
            />
            <span className="font-sora text-xxs text-neutral-400 font-light not-italic">
              {details.town}, {details.city}
            </span>
          </address>
        </div>
      </WouterLink>
    </article>
  )
}
