import { ArrowUpAZIcon, ListFilterIcon } from "lucide-react"
import { useState } from "react"
import { useParams } from "wouter"

import { useBusinessAllCache } from "@/hooks/business"
import { PathParameterError } from "@/lib/errors/ui"
import * as RemoteData from "@/lib/remote-data"

import * as BusinessList from "@/components/business/list"

import { Topbar } from "@/components/topbar"
import * as Breadcrumbs from "@/components/breadcrumbs"
import { ButtonBadge, ButtonScrollTop } from "@/components/button"

export function Tag() {
  const { tagName } = useParams()

  const [tagCount, setTagCount] = useState(5)

  if (tagName === undefined) {
    const tag = "missing"
    const details = { tag } as const
    const parameter = "tagName"
    const schema = "/tags/:tagName"
    throw new PathParameterError(parameter, schema, details)
  }

  const remoteData = useBusinessAllCache()

  const filtered = RemoteData.map(remoteData, (businesses) => {
    return businesses.filter((business) => business.tags.includes(tagName))
  })

  const count = RemoteData.isSuccess(filtered)
    ? filtered.value.length
    : undefined

  return (
    <section className="min-h-screen">
      <Topbar />
      <ButtonScrollTop />

      <section className="px-6">
        <div className="h-2" />

        <HeaderC count={count} tagName={tagName} />

        <div className="h-6" />

        <BusinessList.Root>
          {RemoteData.fold3(filtered, {
            onNone: (): React.ReactNode => {
              return Array(5)
                .fill(0)
                .map((_, index) => {
                  return (
                    <li key={index} className="h-80">
                      <BusinessList.Skeleton />
                    </li>
                  )
                })
            },
            onFailure: (error): React.ReactNode => {
              throw error
            },
            onSuccess: (businesses): React.ReactNode => {
              return businesses.slice(0, tagCount).map((b) => {
                return <BusinessList.Card key={b.id} business={b} />
              })
            },
          })}
        </BusinessList.Root>

        <div className="h-6" />

        <ButtonBadge
          color="neutral"
          size="md"
          type="button"
          onClick={() => setTagCount(tagCount + 5)}
        >
          Show More
        </ButtonBadge>

        <div className="h-6" />
      </section>
    </section>
  )
}

function HeaderA({ tagName }: { tagName: string }) {
  return (
    <header className="flex flex-col justify-center items-center">
      <p className="font-bold font-sora text-xs text-primary/80">Tags</p>
      <h1>
        <span className="font-bold text-xl font-sora text-neutral-600 capitalize">
          {tagName}
        </span>
      </h1>
      <p className="font-sora text-sm text-neutral-400">
        Businesses tagged under {tagName}
      </p>

      <div className="h-2" />

      <div className="flex justify-center items-center gap-1">
        <ButtonBadge size="sm" color="white">
          <div className="flex gap-1 items-center justify-center">
            Sort
            <ArrowUpAZIcon className="size-3" />
          </div>
        </ButtonBadge>
        <ButtonBadge size="sm" color="purple">
          <div className="flex gap-1 items-center justify-center">
            Filter
            <ListFilterIcon className="size-3" />
          </div>
        </ButtonBadge>
      </div>
    </header>
  )
}

function HeaderC({ tagName, count }: { tagName: string; count?: number }) {
  return (
    <header className="flex flex-col justify-center items-start">
      <Breadcrumbs.Root>
        <Breadcrumbs.Crumb href="/explore">Explore</Breadcrumbs.Crumb>
        <Breadcrumbs.Divider />
        <Breadcrumbs.Crumb href="/explore/tags">Tags</Breadcrumbs.Crumb>
        <Breadcrumbs.Divider />
        <Breadcrumbs.Crumb href="#" active>
          {tagName}
        </Breadcrumbs.Crumb>
      </Breadcrumbs.Root>

      <div className="h-2" />

      <div className="w-full flex flex-row justify-between items-center">
        <h1>
          <span className="font-bold text-2xl font-sora text-neutral-600 capitalize">
            {tagName}
          </span>
          {count === undefined ? (
            <div className="h-4 w-60 bg-neutral-100 border-1 border-neutral-200 animate-pulse rounded-xs" />
          ) : (
            <p className="font-sora text-xs text-neutral-400">
              <span className="font-semibold">{count} </span>
              {1 === count ? "business" : "businesses"} tagged under
              <span className="capitalize font-semibold"> {tagName}</span>
            </p>
          )}
        </h1>

        <div className="flex flex-col justify-center items-center gap-1">
          <ButtonBadge size="sm" color="purple">
            <div className="flex gap-1 items-center justify-center">
              Filter
              <ListFilterIcon className="size-3" />
            </div>
          </ButtonBadge>
          <ButtonBadge size="sm" color="white">
            <div className="flex gap-1 items-center justify-center">
              Sort
              <ArrowUpAZIcon className="size-3" />
            </div>
          </ButtonBadge>
        </div>
      </div>
    </header>
  )
}
