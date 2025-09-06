import type { PropsWithChildren } from "react"

type RootProps = {}
export function HeaderRoot({ children }: PropsWithChildren<RootProps>) {
  return (
    <header>
      <div className="flex flex-col items-start">{children}</div>
    </header>
  )
}

type TitleProps = { children: string }
export function HeaderTitle({ children }: TitleProps) {
  return (
    <h1>
      <span className="font-bold text-2xl font-sora text-neutral-600 capitalize">
        {children}
      </span>
    </h1>
  )
}

type SubtitleProps = {}
export function HeaderSubtitle({ children }: PropsWithChildren<SubtitleProps>) {
  return <p className="font-sora text-xs text-neutral-400">{children}</p>
}
