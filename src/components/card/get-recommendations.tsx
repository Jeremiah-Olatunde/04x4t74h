import { Button } from "../button"

export function GetRecommendations() {
  return (
    <div className="rounded-xl p-5 border border-neutral-100 bg-[#fffbed]">
      <div className="flex gap-2">
        <div className="grow">
          <h3 className="font-sora font-semibold text-neutral-700 leading-none">
            Need a <br />
            recommendation?
          </h3>

          <div className="h-2" />

          <p className="font-sora text-neutral-400 text-xxs">
            Tell us a few things like your mood, budget and vibe - we’ll suggest
            the perfect spot.
          </p>
        </div>

        <div className="shrink-0 flex justify-center items-center">
          <img
            src="/images/thumbs-up.png"
            alt="thumbs up"
            className="size-16"
          />
        </div>
      </div>

      <div className="h-4" />

      <Button
        tag="link"
        variant="yellow"
        size="sm"
        href="/recommendations"
        text="Get a recommendation"
      />
    </div>
  )
}
