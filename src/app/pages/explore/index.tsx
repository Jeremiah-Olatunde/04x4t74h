import { Link as LinkWouter } from "wouter"
import { ArrowRightIcon } from "lucide-react"

import { ButtonScrollTop } from "@/components/button"
import { Topbar } from "@/components/topbar"

import * as Breadcrumbs from "@/components/breadcrumbs"
import * as Header from "@/components/header"

export { Businesses } from "./businesses"
export { Tags } from "./tags"
export { Tag } from "./tags/[name]"
export { Cities } from "./cities"
export { City } from "./cities/[city]"
export { Town } from "./cities/[city]/[town]"
export { Categories } from "./categories"
export { Category } from "./categories/[name]"

export function Explore() {
  return (
    <section className="">
      <Topbar />
      <ButtonScrollTop />

      <section className="p-6 pt-0 flex flex-col gap-4">
        <div className="flex flex-col justify-center items-center gap-2">
          <Breadcrumbs.Root>
            <Breadcrumbs.Crumb href="/explore" active>
              Explore
            </Breadcrumbs.Crumb>
          </Breadcrumbs.Root>

          <Header.Root>
            <Header.Title>Explore Plazzaa</Header.Title>
            <Header.Subtitle>
              Choose how you want to explore businesses.
            </Header.Subtitle>
          </Header.Root>
        </div>

        <div className="h-4" />

        <div className="flex flex-col gap-4">
          <div className="h-0.25 bg-neutral-200 w-full" />

          <ExploreItem
            href="/explore/categories"
            title="Categories"
            text="Explore different categories to find your next meal, outing, or experience."
          />

          <div className="h-0.25 bg-neutral-200 w-full" />

          <ExploreItem
            href="/explore/cities"
            title="Cities"
            text="Browse businesses by city and discover what makes each place unique."
          />

          <div className="h-0.25 bg-neutral-200 w-full" />

          <ExploreItem
            href="/explore/tags"
            title="Tags"
            text="Explore spots that match your interests, whether work, play, or everything in between."
          />

          <div className="h-0.25 bg-neutral-200 w-full" />
        </div>
      </section>
    </section>
  )
}

export function ExploreItem({
  title,
  text,
  href,
}: {
  title: string
  text: string
  href: string
}) {
  return (
    <div className="gap-2 flex flex-row justify-center items-center">
      <div>
        <div className="font-sora font-bold text-neutral-600 text-xl">
          {title}
        </div>
        <div className="h-1" />
        <div className="font-sora  text-neutral-400 text-sm">{text}</div>
      </div>

      <div className="h-2" />

      <LinkWouter href={href}>
        <div className="flex items-center justify-center gap-1 w-min font-sora font-semibold text-sm text-neutral-400">
          <ArrowRightIcon className="size-6" />
        </div>
      </LinkWouter>
    </div>
  )
}
