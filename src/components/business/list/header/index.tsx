import { ButtonFilter, ButtonSort } from "@/components/button"
import type { PropsWithChildren } from "react"

type HeaderProps = {}
export function Header({ children }: PropsWithChildren<HeaderProps>) {
  return (
    <header>
      <div className="flex flex-col items-start">{children}</div>
    </header>
  )
}

type TitleProps = { children: string }
export function Title({ children }: TitleProps) {
  return (
    <h1>
      <span className="font-bold text-2xl font-sora text-neutral-600 capitalize">
        {children}
      </span>
    </h1>
  )
}

type SubtitleProps = {}
export function Subtitle({ children }: PropsWithChildren<SubtitleProps>) {
  return <p className="font-sora text-xs text-neutral-400">{children}</p>
}

type RootProps = { handleFilter: () => void; handleSort: () => void }
export function Root({
  children,
  handleFilter,
  handleSort,
}: PropsWithChildren<RootProps>) {
  return (
    <div className="w-full flex flex-row justify-between items-center">
      <div className="grow">{children}</div>

      <div className="flex flex-col justify-center items-center gap-1">
        <ButtonFilter onClick={handleFilter} />
        <ButtonSort onClick={handleSort} />
      </div>
    </div>
  )
}

export function Skeleton() {
  return (
    <span className="block h-4 w-60 bg-neutral-100 border-1 border-neutral-200 animate-pulse rounded-xs" />
  )
}
