import { Search as IconSearch } from "lucide-react"

import { Icon } from "@/components/icon"
import { Logo } from "@/components/logo"
import { LinkBadge } from "@/components/link"

export function Hero() {
  return (
    <header className="rounded-b-2xl bg-[url(/images/bg-guest.png)] bg-cover p-6">
      <div>
        <Logo variant="white" size="sm" />
      </div>

      <div className="h-4" />

      <h1 className="font-sora text-white font-bold text-2xl text-center">
        Best of the city, <br />
        Currated just for you.
      </h1>

      <div className="h-4" />

      <p className="font-sora text-white text-center text-xs">
        Enjoy instant, personalized recommendations for places to eat, chill,
        date, or explore—right in your city.
      </p>

      <div className="h-6" />

      <div className="flex justify-center items-center">
        <span className="text-xs text-white font-sora font-medium">
          Ready to find your Next Spot?
        </span>
      </div>

      <div className="h-2" />

      <div className="flex gap-2 items-center">
        <div className="basis-2/5">
          <LinkBadge
            color="yellow"
            href="/auth/sign-up"
            shape="rounded"
            shade="dark"
            size="md"
          >
            Get Started
          </LinkBadge>
        </div>

        <button
          type="button"
          className="bg-white cursor-pointer basis-3/5 p-2 gap-2 rounded-md flex items-center"
        >
          <Icon
            color="neutral"
            icon={IconSearch}
            label="search plazzaa"
            size="sm"
          />
          <span className="text-xxs text-neutral-400 font-sora">
            Search Plazzaa...
          </span>
        </button>
      </div>

      <div className="h-2" />
    </header>
  )
}
