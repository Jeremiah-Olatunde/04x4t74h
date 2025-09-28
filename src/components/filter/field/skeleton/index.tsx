import type { PropsWithChildren } from "react"

type GroupProps = {}
export function Group({ children }: PropsWithChildren<GroupProps>) {
  return <div className="flex flex-row flex-wrap gap-2">{children}</div>
}

type OptionProps = {}
export function Option({}: OptionProps) {
  const length = Math.floor(5 + Math.random() * 5)
  const text = "x".repeat(length)

  return (
    <div>
      <div
        className="
          px-3 py-2 font-sora font-medium text-xs text-transparent capitalize
        bg-neutral-100 border-1 border-neutral-200 animate-pulse rounded-xl
          "
      >
        {text}
      </div>
    </div>
  )
}
