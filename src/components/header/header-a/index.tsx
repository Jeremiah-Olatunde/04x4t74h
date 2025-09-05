import type { PropsWithChildren } from "react"

type RootProps = {}
export function Root({ children }: PropsWithChildren<RootProps>) {
  return (
    <header>
      <div className="flex flex-col items-center">{children}</div>
    </header>
  )
}

type TitleProps = { children: string }
export function Title({ children }: TitleProps) {
  return (
    <h1>
      <span className="font-sora text-xl font-bold text-neutral-600">
        {children}
      </span>
    </h1>
  )
}

type SubtitleProps = { children: string }
export function Subtitle({ children }: SubtitleProps) {
  return (
    <p>
      <span className="font-sora text-sm text-neutral-400">{children}</span>
    </p>
  )
}
