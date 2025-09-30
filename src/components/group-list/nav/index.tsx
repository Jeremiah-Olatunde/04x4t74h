import { LinkBadge } from "@/components/link"
import type { PropsWithChildren } from "react"

type RootProps = {}
export function Root({ children }: PropsWithChildren<RootProps>) {
  return (
    <nav>
      <ul className="flex flex-row justify-center gap-2 flex-wrap  w-full">
        {children}
      </ul>
    </nav>
  )
}

type TabProps = { href: string }
export function Tab({ children, href }: PropsWithChildren<TabProps>) {
  return (
    <li>
      <LinkBadge href={href} size="sm" color="light">
        {children}
      </LinkBadge>
    </li>
  )
}
