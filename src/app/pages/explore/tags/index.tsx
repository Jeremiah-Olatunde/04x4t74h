import { type ReactNode } from "react"

import { useBusinessAllCache } from "@/hooks/business"
import { Topbar } from "@/components/topbar"
import * as Business from "@/components/business"
import * as RemoteData from "@/lib/remote-data"
import * as Breadcrumbs from "@/components/breadcrumbs"
import * as Scroll from "@/components/scroll"
import { Centered as Header } from "@/components/header"
import { groupByTag } from "@/utils/business"

export function Tags() {
  const remoteData = useBusinessAllCache()

  const data = RemoteData.map(remoteData, (businesses) => {
    const groups = groupByTag(businesses)
    return { groups }
  })

  return (
    <section className="relative flex flex-col">
      <Topbar />
      <Scroll.Button.Top />

      <section className="p-4 pt-0 flex flex-col gap-6">
        <div className="flex flex-col justify-center items-center gap-2">
          <Breadcrumbs.Root>
            <Breadcrumbs.Crumb href="/explore">Explore</Breadcrumbs.Crumb>
            <Breadcrumbs.Divider />
            <Breadcrumbs.Crumb href="#" active>
              Tags
            </Breadcrumbs.Crumb>
          </Breadcrumbs.Root>

          <Header.Root>
            <Header.Title>Explore by Tags</Header.Title>
            <Header.Subtitle>
              Explore businesses grouped by what they do
            </Header.Subtitle>
          </Header.Root>
        </div>

        {RemoteData.fold3Unsafe(data, {
          onNone: (): ReactNode => {
            return (
              <>
                <Business.GroupList.Skeleton.Nav length={25} />
                <Business.GroupList.Skeleton.List />
              </>
            )
          },
          onSuccess: ({ groups }): ReactNode => {
            const items = groups.map(([name]) => {
              return [name, `/explore/tags/${name}`] as const
            })

            return (
              <>
                <Business.GroupList.Nav items={items} />
                <Business.GroupList.List groups={groups} />
              </>
            )
          },
        })}
      </section>
    </section>
  )
}
