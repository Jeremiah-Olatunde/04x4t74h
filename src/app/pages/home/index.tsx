import { Button } from "@/components/button"
import { Icon } from "@/components/icon"
import { Logo } from "@/components/logo"
import { Search as IconSearch } from "lucide-react"

export function Home() {
  return (
    <section className="flex flex-col">
      <Header />

      <section className="p-6">
        <AskKimbo />
      </section>
    </section>
  )
}

function Header() {
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
          <Button
            tag="link"
            variant="yellow"
            size="sm"
            text="Get Started"
            href="/auth/sign-up"
          />
        </div>

        <button
          type="button"
          className="bg-white cursor-pointer basis-3/5 p-2 gap-2 rounded-md flex items-center"
        >
          <Icon icon={IconSearch} size="sm" label="search plazzaa" />
          <span className="text-xxs text-neutral-400 font-sora">
            Search Plazzaa...
          </span>
        </button>
      </div>

      <div className="h-2" />
    </header>
  )
}

function AskKimbo() {
  return (
    <div className="flex gap-2 rounded-xl p-4 bg-[url(/images/bg-ask-kimbo.png)] bg-size-[100%_100%] bg-no-repeat">
      <div className="basis-2/3">
        <h3 className="font-sora font-semibold text-white leading-none">
          Need a <br />
          recommendation?
        </h3>

        <div className="h-2" />

        <p className="font-sora text-white text-xxs">
          Tell us a few things like your mood, budget and vibe - we’ll suggest
          the perfect spot.
        </p>

        <div className="h-2" />

        <Button
          tag="link"
          variant="yellow"
          size="sm"
          href="/recommendations"
          text="Get a recommendation"
        />
      </div>

      <div className="basis-1/3 flex justify-center items-center">
        <img src="/images/kimbo.png" alt="kimbo" className="size-24 " />
      </div>
    </div>
  )
}
