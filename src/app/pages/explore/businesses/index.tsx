import { type ReactNode } from "react"

import { useBusinessAllCache } from "@/hooks/business"
import * as RemoteData from "@/lib/remote-data"

import * as Business from "@/components/business"
import * as Breadcrumbs from "@/components/breadcrumbs"
import * as Scroll from "@/components/scroll"

import { Topbar } from "@/components/topbar"
import { WithControls as Header } from "@/components/header"

export function Businesses() {
  const businesses = useBusinessAllCache()

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
            <Breadcrumbs.Crumb href="/explore/businesses" active>
              Businesses
            </Breadcrumbs.Crumb>
          </Breadcrumbs.Root>

          <Header.Root>
            <Header.Content>
              <Header.Title>Businesses</Header.Title>
              <Header.Subtitle>
                {RemoteData.fold3Unsafe(businesses, {
                  onNone: (): ReactNode => <Header.Skeleton.Subtitle />,
                  onSuccess: (businesses): ReactNode => {
                    return (
                      <>
                        <span className="font-semibold">
                          {businesses.length}
                        </span>
                        <span> businesses on Plazzaa </span>
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
