import type { PropsWithChildren } from "react"
import { LinkBadge } from "@/components/link"

type PlaceholderProps = {
  title: string
  subtitle: string
  text: string
}
export function Placeholder({ title, subtitle, text }: PlaceholderProps) {
  return (
    <section className="h-screen flex flex-col gap-4 px-6 py-8 justify-center">
      <header className="flex flex-col">
        <h1 className="font-sora text-xl text-neutral-600 font-medium">
          {title}
        </h1>
        <p className="text-neutral-400 text-sm font-medium font-sora">
          {subtitle}
        </p>
      </header>

      <p className="font-sora text-neutral-600">{text}</p>
    </section>
  )
}

type RootProps = {}
export function Root({ children }: PropsWithChildren<RootProps>) {
  return (
    <section className="h-screen flex flex-col gap-4 px-6 py-8 justify-center">
      {children}
    </section>
  )
}

type HeaderProps = {}
export function Header({ children }: PropsWithChildren<HeaderProps>) {
  return <header className="flex flex-col">{children}</header>
}

type TitleProps = { children: string }
export function Title({ children }: TitleProps) {
  return (
    <h1 className="font-sora text-xl text-neutral-600 font-medium capitalize">
      {children}
    </h1>
  )
}

type SubtitleProps = { children: string }
export function Subtitle({ children }: SubtitleProps) {
  return (
    <p className="text-neutral-400 text-sm font-medium font-sora">{children}</p>
  )
}

type ContentProps = { children: string }
export function Content({ children }: ContentProps) {
  return <p className="font-sora text-neutral-600">{children}</p>
}

export function LinkHome() {
  return (
    <div className="flex justify-start">
      <LinkBadge href="/home" size="md" color="white">
        Home
      </LinkBadge>
    </div>
  )
}
