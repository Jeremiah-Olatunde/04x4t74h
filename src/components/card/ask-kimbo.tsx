import { LinkBadge } from "@/components/link"

export function AskKimbo() {
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

        <LinkBadge color="yellow" href="/recommendations" size="sm">
          Get a recommendation
        </LinkBadge>
      </div>

      <div className="basis-1/3 flex justify-center items-center">
        <img
          src={`${import.meta.env.BASE_URL}images/kimbo.png`}
          alt="kimbo"
          className="size-24 "
        />
      </div>
    </div>
  )
}
