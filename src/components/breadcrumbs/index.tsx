import { ChevronRightIcon } from "lucide-react"
import type { PropsWithChildren } from "react"
import { Link as LinkWouter } from "wouter"

export function Root({ children }: PropsWithChildren<{}>) {
  return (
    <nav>
      <ul>
        <div className="bg-neutral-50 rounded-s-full rounded-e-full py-1 px-2 w-min flex gap-1 items-center justify-center">
          {children}
        </div>
      </ul>
    </nav>
  )
}

type CrumbProps = { children: string; active?: boolean; href: string }
export function Crumb({ active, children, href }: CrumbProps) {
  return (
    <li>
      <LinkWouter href={href}>
        <div
          className={`
        font-sora font-semibold text-xxs capitalize 
        ${active ? "text-primary" : "text-neutral-400"}
      `}
        >
          {children}
        </div>
      </LinkWouter>
    </li>
  )
}

type DividerProps = {}
export function Divider({}: DividerProps) {
  return <ChevronRightIcon className="font-sora text-neutral-400 size-4" />
}
