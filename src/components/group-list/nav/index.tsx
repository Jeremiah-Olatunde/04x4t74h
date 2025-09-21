import { LinkBadge } from "@/components/link"
import type { PropsWithChildren } from "react"

type RootProps = {}
export function Root({ children }: PropsWithChildren<RootProps>) {
  return (
    <nav>
      <ul className="flex flex-row flex-wrap gap-2 justify-center">
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
