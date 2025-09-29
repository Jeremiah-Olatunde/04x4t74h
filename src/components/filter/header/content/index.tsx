import type { PropsWithChildren } from "react"

type RootProps = {}
export function Root({ children }: PropsWithChildren<RootProps>) {
  return (
    <header className="flex flex-col justify-center items-center">
      <Title />
      <Subtitle>{children}</Subtitle>
    </header>
  )
}

type TitleProps = {}
export function Title({}: TitleProps) {
  return (
    <h1 className="font-sora text-neutral-600 text-lg font-bold">Filters</h1>
  )
}

type SubtitleProps = {}
export function Subtitle({ children }: PropsWithChildren<SubtitleProps>) {
  return (
    <p className="font-sora text-neutral-400 text-xs text-center">{children}</p>
  )
}
