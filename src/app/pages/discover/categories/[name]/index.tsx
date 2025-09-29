import { type ReactNode } from "react"
import { useParams, useSearchParams } from "wouter"

import { useBusinessAllCache } from "@/hooks/business"
import { PathParameterError } from "@/lib/errors/ui"
import * as RemoteData from "@/lib/remote-data"

import * as Business from "@/components/business"
import * as Breadcrumbs from "@/components/breadcrumbs"
import * as Scroll from "@/components/scroll"

import { Topbar } from "@/components/topbar"
import * as Header from "@/components/header"

import { getInCategory } from "@/utils/business"
import { Chips } from "@/features/business/components/filter"

import * as Url from "@/features/business/lib/url"

export function Category() {
  const { name } = useParams()
  const [params] = useSearchParams()

  if (name === undefined) {
    const tag = "missing"
    const details = { tag } as const
    const parameter = "name"
    const schema = "/categories/:name"
    throw new PathParameterError(parameter, schema, details)
  }

  const remoteData = useBusinessAllCache()

  const businesses = RemoteData.map(remoteData, (businesses) => {
    return getInCategory(businesses, name)
  })

  const chips = Url.enumerate(params)

  return (
    <section className="min-h-screen">
      <Scroll.Auto.Top />
      <Scroll.Button.Top />

      <Topbar />

      <section className="p-4 flex flex-col gap-6">
        <div className="flex flex-col gap-2 justify-center items-center">
          <Breadcrumbs.Root>
            <Breadcrumbs.Crumb href="#" active>
              Category
            </Breadcrumbs.Crumb>
          </Breadcrumbs.Root>

          <Header.Root>
            <Header.Content>
              <Header.Title>{name}</Header.Title>
              <Header.Subtitle>
                {RemoteData.fold3Unsafe(businesses, {
                  onNone: (): ReactNode => <Header.Skeleton.Subtitle />,
                  onSuccess: (businesses): ReactNode => {
                    return (
                      <>
                        <span className="font-semibold">
                          {businesses.length}
                        </span>
                        <span> businesses under </span>
                        <span className="font-semibold capitalize">{name}</span>
                        {0 < chips.length ? (
                          <span> matching filters</span>
                        ) : (
                          <span> category</span>
                        )}
                      </>
                    )
                  },
                })}
              </Header.Subtitle>
            </Header.Content>

            <Header.Control.Root>
              <Header.Control.Filters
                href={`/discover/categories/${name}/filters?${params.toString()}`}
              />
              <Header.Control.Sort href="#" />
            </Header.Control.Root>
          </Header.Root>
        </div>

        <Chips chips={chips} />

        {RemoteData.fold3Unsafe(businesses, {
          onNone: (): React.ReactNode => {
            return <Business.CardGrid.Skeleton.Grid />
          },
          onSuccess: (businesses): React.ReactNode => {
            return <Business.CardGrid.Grid businesses={businesses} />
          },
        })}
      </section>
    </section>
  )
}
