import { Fieldset } from "@base-ui-components/react/fieldset"

export function Title() {
  return (
    <Fieldset.Legend>
      <div className="capitalize font-sora text-sm font-medium text-transparent bg-neutral-100 border-1 border-neutral-200 animate-pulse rounded-md">
        dummy text
      </div>
    </Fieldset.Legend>
  )
}

export function Clear() {
  return (
    <button
      type="button"
      className="font-sora text-transparent text-xs font-medium bg-neutral-100 border-1 border-neutral-200 animate-pulse rounded-md"
    >
      Clear
    </button>
  )
}
