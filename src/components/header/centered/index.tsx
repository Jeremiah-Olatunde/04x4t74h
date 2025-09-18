import type { PropsWithChildren } from "react"

type RootProps = {}
export function Root({ children }: PropsWithChildren<RootProps>) {
  return (
    <header>
      <div className="flex flex-col items-center gap-1">{children}</div>
    </header>
  )
}

type TitleProps = {}
export function Title({ children }: PropsWithChildren<TitleProps>) {
  return (
    <h1>
      <span className="font-sora text-xl font-bold text-neutral-600">
        {children}
      </span>
    </h1>
  )
}

type SubtitleProps = {}
export function Subtitle({ children }: PropsWithChildren<SubtitleProps>) {
  return (
    <p className="font-sora text-sm text-neutral-400 text-center">{children}</p>
  )
}
