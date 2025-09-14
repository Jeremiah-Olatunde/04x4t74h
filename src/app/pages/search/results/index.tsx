import { ButtonScrollTop } from "@/components/button"
import { Topbar } from "@/components/topbar"
import { useSearch } from "wouter"

export function Results() {
  const search = useSearch()
  console.log("query string:", new URLSearchParams(search).toString())
  return (
    <section className="relative flex flex-col min-h-svh">
      <ButtonScrollTop />
      <Topbar />

      <section className="p-6 pt-0 flex flex-col gap-4"></section>
    </section>
  )
}
