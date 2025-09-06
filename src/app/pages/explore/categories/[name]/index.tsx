import { useState, type ReactNode } from "react"
import { useParams } from "wouter"

import { useBusinessAllCache } from "@/hooks/business"
import { PathParameterError } from "@/lib/errors/ui"
import * as RemoteData from "@/lib/remote-data"

import * as BusinessList from "@/components/business/list"

import { Topbar } from "@/components/topbar"
import * as Breadcrumbs from "@/components/breadcrumbs"
import { ButtonBadge, ButtonScrollTop } from "@/components/button"
import { getInCategory } from "@/utils/business"

export function Category() {
  const { name } = useParams()

  const [count, setCount] = useState(5)

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

  return (
    <section className="min-h-screen">
      <Topbar />
      <ButtonScrollTop />

      <section className="px-6">
        <div className="flex flex-col gap-2">
          <Breadcrumbs.Root>
            <Breadcrumbs.Crumb href="/explore">Explore</Breadcrumbs.Crumb>
            <Breadcrumbs.Divider />
            <Breadcrumbs.Crumb href="/explore/categories">
              Categories
            </Breadcrumbs.Crumb>
            <Breadcrumbs.Divider />
            <Breadcrumbs.Crumb href="#" active>
              {name}
            </Breadcrumbs.Crumb>
          </Breadcrumbs.Root>

          <BusinessList.Header.Root
            handleFilter={() => {}}
            handleSort={() => {}}
          >
            <BusinessList.Header.Header>
              <BusinessList.Header.Title>{name}</BusinessList.Header.Title>
              <BusinessList.Header.Subtitle>
                {RemoteData.fold3(businesses, {
                  onFailure: (error): ReactNode => {
                    throw error
                  },
                  onNone: (): ReactNode => <BusinessList.Header.Skeleton />,
                  onSuccess: (businesses): ReactNode => {
                    return (
                      <>
                        <span className="font-semibold">
                          {businesses.length}
                        </span>
                        <span> businesses under the </span>
                        <span className="font-semibold capitalize">{name}</span>
                        <span> category</span>
                      </>
                    )
                  },
                })}
              </BusinessList.Header.Subtitle>
            </BusinessList.Header.Header>
          </BusinessList.Header.Root>
        </div>

        <div className="h-6" />

        {RemoteData.fold3(businesses, {
          onFailure: (error): React.ReactNode => {
            throw error
          },
          onNone: (): React.ReactNode => <BusinessList.Skeleton />,
          onSuccess: (businesses): React.ReactNode => {
            return (
              <BusinessList.List>
                {businesses.slice(0, count).map((b) => {
                  return <BusinessList.Card key={b.id} business={b} />
                })}
              </BusinessList.List>
            )
          },
        })}

        <div className="h-6" />

        <ButtonBadge
          color="neutral"
          size="md"
          type="button"
          onClick={() => setCount(count + 5)}
        >
          Show More
        </ButtonBadge>

        <div className="h-6" />
      </section>
    </section>
  )
}
