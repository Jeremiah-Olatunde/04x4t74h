import { type ReactNode } from "react"
import { useParams } from "wouter"

import { useBusinessAllCache } from "@/hooks/business"
import { PathParameterError } from "@/lib/errors/ui"

import { Topbar } from "@/components/topbar"
import { Centered as Header } from "@/components/header"

import * as Business from "@/components/business"
import * as RemoteData from "@/lib/remote-data"
import * as Breadcrumbs from "@/components/breadcrumbs"
import * as Scroll from "@/components/scroll"

import { getInCity, groupByTown } from "@/utils/business"

export function City() {
  const { city } = useParams()

  if (city === undefined) {
    const tag = "missing"
    const details = { tag } as const
    const parameter = "city"
    const schema = "/cities/:city"
    throw new PathParameterError(parameter, schema, details)
  }

  const remoteData = useBusinessAllCache()

  const data = RemoteData.map(remoteData, (businesses) => {
    const inCity = getInCity(businesses, city)
    const groups = groupByTown(inCity)
    return { groups }
  })

  return (
    <section className="relative flex flex-col">
      <Topbar />
      <Scroll.Button.Top />

      <section className="p-6 pt-0 flex flex-col gap-4">
        <div className="flex flex-col justify-center items-center gap-2">
          <Breadcrumbs.Root>
            <Breadcrumbs.Crumb href="/explore">Explore</Breadcrumbs.Crumb>
            <Breadcrumbs.Divider />
            <Breadcrumbs.Crumb href="/explore/cities">Cities</Breadcrumbs.Crumb>
            <Breadcrumbs.Divider />
            <Breadcrumbs.Crumb href="#" active>
              {city}
            </Breadcrumbs.Crumb>
          </Breadcrumbs.Root>

          <Header.Root>
            <Header.Title>Explore {city}</Header.Title>
            <Header.Subtitle>Find your next stop in {city}.</Header.Subtitle>
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
            const items = groups.map(([name, businesses]) => {
              const href = `/explore/cities/${city}/${name}/`
              return [name, href, businesses] as const
            })

            return (
              <>
                <Business.GroupList.Nav items={items} />
                <Business.GroupList.List items={items} />
              </>
            )
          },
        })}
      </section>
    </section>
  )
}
