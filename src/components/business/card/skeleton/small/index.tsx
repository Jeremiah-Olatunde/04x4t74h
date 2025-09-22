export function Small() {
  return (
    <div className="h-full w-full relative rounded-xl border border-neutral-100">
      <div className="flex flex-col h-full w-full">
        <div className="rounded-t-xl grow-1 bg-neutral-100 border-b-1 border-neutral-200 animate-pulse"></div>

        <div className="p-4 pt-2">
          <div className="flex gap-2 justify-between items-start">
            <div className="h-4 w-24 bg-neutral-100 border-1 border-neutral-200 animate-pulse rounded-xs" />
            <div className="h-4 w-8 bg-neutral-100 border-1 border-neutral-200 animate-pulse rounded-xs" />
          </div>

          <div className="h-1" />

          <div className="h-5 w-2/3 bg-neutral-100 border-1 border-neutral-200 animate-pulse rounded-xs" />

          <div className="h-4" />

          <div className="h-4 w-30 bg-neutral-100 border-1 border-neutral-200 animate-pulse rounded-xs" />
        </div>
      </div>
    </div>
  )
}
