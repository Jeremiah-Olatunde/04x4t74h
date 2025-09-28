import { type ReactNode } from "react"

import { useBusinessAllCache } from "@/hooks/business"

import { Topbar } from "@/components/topbar"
import * as Header from "@/components/header"

import * as Business from "@/components/business"
import * as RemoteData from "@/lib/remote-data"
import * as Breadcrumbs from "@/components/breadcrumbs"
import * as Scroll from "@/components/scroll"

import { groupByCategory } from "@/utils/business"

export function Categories() {
  const remoteData = useBusinessAllCache()

  const data = RemoteData.map(remoteData, (businesses) => {
    const groups = groupByCategory(businesses)
    return { groups }
  })

  return (
    <section className="relative flex flex-col">
      <Topbar />
      <Scroll.Button.Top />

      <section className="p-4 flex flex-col gap-2">
        <div className="flex flex-col justify-center items-center gap-2">
          <Breadcrumbs.Root>
            <Breadcrumbs.Crumb href="/discover">Discover</Breadcrumbs.Crumb>
            <Breadcrumbs.Divider />
            <Breadcrumbs.Crumb href="#" active>
              Categories
            </Breadcrumbs.Crumb>
          </Breadcrumbs.Root>

          <Header.Root>
            <Header.Title>Discover Category</Header.Title>
            <Header.Subtitle>
              Browse different types of businesses.
            </Header.Subtitle>
          </Header.Root>
        </div>

        <div className="flex flex-col gap-10">
          {RemoteData.fold3Unsafe(data, {
            onNone: (): ReactNode => {
              return (
                <>
                  <Business.GroupList.Skeleton.Nav length={5} />
                  <Business.GroupList.Skeleton.List />
                </>
              )
            },
            onSuccess: ({ groups }): ReactNode => {
              const items = groups.map(([name, businesses]) => {
                return [
                  name,
                  `/discover/categories/${name}`,
                  businesses,
                ] as const
              })

              return (
                <>
                  <Business.GroupList.Nav items={items} />
                  <Business.GroupList.List items={items} />
                </>
              )
            },
          })}
        </div>
      </section>
    </section>
  )
}
