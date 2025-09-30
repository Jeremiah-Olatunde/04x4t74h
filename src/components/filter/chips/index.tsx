import type { PropsWithChildren } from "react"

export function Root({ children }: PropsWithChildren<{}>) {
  return (
    <div className="border-1 border-neutral-100 flex flex-col gap-4 bg-neutral-50 rounded-xl p-4">
      <div className="flex flex-row justify-between items-center">
        <div className="font-sora font-medium text-neutral-600 text-sm">
          Filters
        </div>
        <button
          type="button"
          className="font-sora font-medium text-transparent text-xs"
        >
          Clear
        </button>
      </div>

      <div className="flex flex-row flex-wrap gap-x-2 gap-y-3">{children}</div>
    </div>
  )
}

export function Chip({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex flex-col border-1 border-neutral-200 bg-neutral-100 px-3 py-3 rounded-xl relative">
      <span className="font-sora text-xxs font-bold text-neutral-400 capitalize absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-1 rounded-md bg-neutral-50 border-1 border-neutral-200">
        {name}
      </span>
      <span className="font-sora font-medium text-xs text-neutral-400 capitalize">
        {value}
      </span>
    </div>
  )
}
