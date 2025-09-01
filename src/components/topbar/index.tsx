import { Sidebar } from "@/components/sidebar"
import type { PropsWithChildren } from "react"
import { ButtonBackIcon } from "../button"

type TopbarProps = {}
export function Topbar({ children }: PropsWithChildren<TopbarProps>) {
  return (
    <section className="relative flex flex-row justify-between items-center">
      <ButtonBackIcon />
      <Sidebar />
      <div className="absolute top-1/2 left-1/2 -translate-1/2">{children}</div>
    </section>
  )
}
