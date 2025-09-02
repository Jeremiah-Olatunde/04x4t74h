import type { PropsWithChildren } from "react"
import { ArrowLeftIcon } from "lucide-react"

type TopbarProps = {}
export function Topbar({}: TopbarProps) {
  return (
    <section className="relative flex flex-row justify-between items-center">
      <button
        type="button"
        className="flex gap-1 items-center"
        onClick={() => history.back()}
      >
        <ArrowLeftIcon className="text-neutral-600 size-4" />
        <span className="font-sora text-neutral-600 text-sm font-bold">
          Back
        </span>
      </button>
    </section>
  )
}
