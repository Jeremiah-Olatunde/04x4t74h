import { useState, type ReactNode } from "react"
import { useParams } from "wouter"

import { useBusinessAllCache } from "@/hooks/business"
import { PathParameterError } from "@/lib/errors/ui"
import * as RemoteData from "@/lib/remote-data"

import * as BusinessList from "@/components/business/list"
import { WithControls as Header } from "@/components/header"

import { Topbar } from "@/components/topbar"
import * as Breadcrumbs from "@/components/breadcrumbs"
import { ButtonBadge, ButtonScrollTop } from "@/components/button"
import { getWithTag } from "@/utils/business"

export function Tag() {
  const { name } = useParams()

  const [count, setCount] = useState(5)

  if (name === undefined) {
    const tag = "missing"
    const details = { tag } as const
    const parameter = "name"
    const schema = "/tags/:name"
    throw new PathParameterError(parameter, schema, details)
  }

  const remoteData = useBusinessAllCache()

  const businesses = RemoteData.map(remoteData, (businesses) => {
    return getWithTag(businesses, name)
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
            <Breadcrumbs.Crumb href="/explore/tags">Tags</Breadcrumbs.Crumb>
            <Breadcrumbs.Divider />
            <Breadcrumbs.Crumb href="#" active>
              {name}
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
                        <span> businesses under the </span>
                        <span className="font-semibold capitalize">{name}</span>
                        <span> category</span>
                      </>
                    )
                  },
                })}
              </Header.Subtitle>
            </Header.Content>

            <Header.Control.Root>
              <Header.Control.Filter href="#" />
              <Header.Control.Sort href="#" />
            </Header.Control.Root>
          </Header.Root>
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
