import { LinkBack } from "@/components/link"
import { Sidebar } from "@/components/sidebar"
import type { PropsWithChildren } from "react"

type TopbarProps = { href: string }
export function Topbar({ href, children }: PropsWithChildren<TopbarProps>) {
  return (
    <section className="relative flex flex-row justify-between items-center">
      <LinkBack href={href} />
      <Sidebar />
      <div className="absolute top-1/2 left-1/2 -translate-1/2">{children}</div>
    </section>
  )
}
