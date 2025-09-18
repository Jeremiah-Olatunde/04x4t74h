import type { PropsWithChildren } from "react"

export * as Skeleton from "./skeleton"

type RootProps = {}
export function Root({ children }: PropsWithChildren<RootProps>) {
  return (
    <header className="w-full flex flex-row gap-2 justify-between items-center">
      {children}
    </header>
  )
}

type HeaderProps = {}
export function Content({ children }: PropsWithChildren<HeaderProps>) {
  return (
    <div className="grow min-w-0">
      <div className="flex flex-col items-start">{children}</div>
    </div>
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
  return (
    <p className="font-sora text-xs text-neutral-400 truncate w-full">
      {children}
    </p>
  )
}

type ControlsProps = {}
export function Controls({ children }: PropsWithChildren<ControlsProps>) {
  return (
    <div className="flex flex-col justify-center items-center gap-1">
      {children}
    </div>
  )
}
