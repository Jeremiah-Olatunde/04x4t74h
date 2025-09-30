import { LinkBadge } from "@/components/link"
import type { PropsWithChildren } from "react"

type RootProps = {}
export function Root({ children }: PropsWithChildren<RootProps>) {
  return (
    <nav>
      <ul className="flex flex-row gap-2 overflow-x-scroll no-scrollbar w-full snap-mandatory snap-x">
        {children}
      </ul>
    </nav>
  )
}

type TabProps = { href: string }
export function Tab({ children, href }: PropsWithChildren<TabProps>) {
  return (
    <li className="snap-start">
      <LinkBadge href={href} size="sm" color="light">
        {children}
      </LinkBadge>
    </li>
  )
}
