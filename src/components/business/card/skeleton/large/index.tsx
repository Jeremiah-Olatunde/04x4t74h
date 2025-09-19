export function Large() {
  return (
    <div className="w-full h-90 relative rounded-xl border border-neutral-100">
      <div className="flex flex-col h-full w-full">
        <div className="rounded-t-xl grow-1 bg-neutral-100 border-b-1 border-neutral-200 animate-pulse" />

        <div className="p-6 pt-4">
          <div className="flex gap-2 justify-between items-start">
            <div className="h-4 w-24 bg-neutral-100 border-1 border-neutral-200 animate-pulse rounded-xs" />
            <div className="h-4 w-8 bg-neutral-100 border-1 border-neutral-200 animate-pulse rounded-xs" />
          </div>

          <div className="h-2" />

          <div className="h-5 w-2/3 bg-neutral-100 border-1 border-neutral-200 animate-pulse rounded-xs" />

          <div className="h-6" />

          <div className="h-4 w-30 bg-neutral-100 border-1 border-neutral-200 animate-pulse rounded-xs" />
        </div>
      </div>
    </div>
  )
}
