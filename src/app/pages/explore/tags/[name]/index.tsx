import { type ReactNode } from "react"
import { useParams } from "wouter"

import { useBusinessAllCache } from "@/hooks/business"
import { PathParameterError } from "@/lib/errors/ui"
import * as RemoteData from "@/lib/remote-data"

import * as Business from "@/components/business"
import * as Breadcrumbs from "@/components/breadcrumbs"
import * as Scroll from "@/components/scroll"

import { Topbar } from "@/components/topbar"
import { WithControls as Header } from "@/components/header"

import { getWithTag } from "@/utils/business"

export function Tag() {
  const { name } = useParams()

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
      <Scroll.Auto.Top />
      <Scroll.Button.Top />

      <Topbar />

      <section className="px-4">
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
