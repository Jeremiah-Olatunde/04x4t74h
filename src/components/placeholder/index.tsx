import type { PropsWithChildren } from "react"
import { LinkBadge } from "@/components/link"
import { ButtonBadge } from "@/components/button"
import { Topbar } from "@/components/topbar"

type PlaceholderProps = {
  title: string
  subtitle: string
  text: string
}

export function Placeholder({ title, subtitle, text }: PlaceholderProps) {
  return (
    <Root>
      <Header>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </Header>

      <Content>{text}</Content>

      <div className="flex justify-start gap-1">
        <Back />
        <Home />
      </div>
    </Root>
  )
}

type RootProps = {}
export function Root({ children }: PropsWithChildren<RootProps>) {
  return (
    <div className="h-screen flex flex-col">
      <Topbar />

      <section className="grow flex flex-col gap-4 px-6 py-8 justify-center">
        {children}
      </section>
    </div>
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

export function Back() {
  return (
    <div>
      <ButtonBadge color="neutral" size="md">
        Back
      </ButtonBadge>
    </div>
  )
}

export function Home() {
  return (
    <LinkBadge href="/discover/home" size="md" color="white">
      Home
    </LinkBadge>
  )
}
