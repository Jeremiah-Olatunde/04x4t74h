import type { PropsWithChildren, ReactNode } from "react"

import { ButtonApply, ButtonReset, ButtonScrollTop } from "@/components/button"
import { Topbar } from "@/components/topbar"
import { HeaderWithControls as Header } from "@/components/header"

import { useBusinessAllCache } from "@/hooks/business"
import * as RemoteData from "@/lib/remote-data"
import {
  getAmenities,
  getCategories,
  getCities,
  getTags,
} from "@/utils/business"
import { useLocation, useSearchParams } from "wouter"

export function Filter() {
  const [_, setLocation] = useLocation()
  const [params] = useSearchParams()
  const term = params.get("term") ?? ""
  const categories = params.getAll("category")
  const tags = params.getAll("tag")
  const amenities = params.getAll("amenity")
  const cities = params.getAll("city")

  const remoteData = useBusinessAllCache()

  const data = RemoteData.map(remoteData, (businesses) => {
    const tags = getTags(businesses)
    const categories = getCategories(businesses)
    const amenities = getAmenities(businesses)
    const cities = getCities(businesses)
    return { amenities, categories, cities, tags }
  })

  return (
    <section className="min-h-screen">
      <Topbar />
      <ButtonScrollTop />
      <div className="h-6" />

      <form
        onSubmit={(event) => {
          event.preventDefault()
          event.stopPropagation()
          const data = new FormData(event.currentTarget)
          const entries = data.entries().toArray()
          const params = new URLSearchParams(entries as [string, string][])
          params.set("term", term)
          setLocation(`/search/results?${params.toString()}`)
        }}
        className="px-6 flex flex-col gap-6"
      >
        <Header.Root>
          <Header.Content>
            <Header.Title>Filters</Header.Title>
            <Header.Subtitle>
              <span> Filtering results for </span>
              <span className="italic font-semibold">"{term}"</span>
            </Header.Subtitle>
          </Header.Content>
          <Header.Controls>
            <ButtonApply type="submit" />
            <ButtonReset
              type="button"
              onClick={() => {
                document
                  .querySelectorAll(".option-item>input")
                  .forEach((item) => {
                    if (item instanceof HTMLInputElement) {
                      item.checked = false
                    }
                  })
              }}
            />
          </Header.Controls>
        </Header.Root>

        <div />

        <Root>
          <Title>Categories</Title>
          {RemoteData.fold3(data, {
            onFailure: (error): ReactNode => {
              throw error
            },
            onNone: (): ReactNode => <OptionListSkeleton />,

            onSuccess: ({ categories: group }): ReactNode => {
              return (
                <OptionList>
                  {group.map((item) => (
                    <label
                      className="
        option-item
        border-1 border-neutral-100 bg-neutral-50 px-3 py-2 rounded-xl font-sora font-medium text-xs capitalize text-neutral-400
        has-checked:bg-primary/5 has-checked:border-primary has-checked:text-primary 
      "
                    >
                      {item}
                      <input
                        value={item}
                        type="radio"
                        id={item}
                        name={"category"}
                        defaultChecked={categories.includes(item)}
                        hidden
                      />
                    </label>
                  ))}
                </OptionList>
              )
            },
          })}
        </Root>

        <Root>
          <Title>Tags</Title>
          {RemoteData.fold3(data, {
            onFailure: (error): ReactNode => {
              throw error
            },
            onNone: (): ReactNode => <OptionListSkeleton />,

            onSuccess: ({ tags: group }): ReactNode => {
              return (
                <OptionList>
                  {group.map((item) => (
                    <OptionItem
                      group="tag"
                      value={item}
                      key={item}
                      defaultChecked={tags.includes(item)}
                    />
                  ))}
                </OptionList>
              )
            },
          })}
        </Root>

        <Root>
          <Title>Amenities</Title>
          {RemoteData.fold3(data, {
            onFailure: (error): ReactNode => {
              throw error
            },
            onNone: (): ReactNode => <OptionListSkeleton />,

            onSuccess: ({ amenities: group }): ReactNode => {
              return (
                <OptionList>
                  {group.map((item) => (
                    <OptionItem
                      group="amenity"
                      value={item}
                      key={item}
                      defaultChecked={amenities.includes(item)}
                    />
                  ))}
                </OptionList>
              )
            },
          })}
        </Root>

        <Root>
          <Title>Cities</Title>
          {RemoteData.fold3(data, {
            onFailure: (error): ReactNode => {
              throw error
            },
            onNone: (): ReactNode => <OptionListSkeleton />,

            onSuccess: ({ cities: group }): ReactNode => {
              return (
                <OptionList>
                  {group.map((item) => (
                    <OptionItem
                      group="city"
                      value={item}
                      key={item}
                      defaultChecked={cities.includes(item)}
                    />
                  ))}
                </OptionList>
              )
            },
          })}
        </Root>

        <div />
      </form>
    </section>
  )
}

function Root({ children }: PropsWithChildren<{}>) {
  return (
    <fieldset>
      <div className="flex flex-col gap-4">{children}</div>
    </fieldset>
  )
}

function Title({ children }: PropsWithChildren<{}>) {
  return (
    <legend>
      <div className="font-sora text-sm font-medium text-neutral-600">
        {children}
      </div>
    </legend>
  )
}

function OptionList({ children }: PropsWithChildren<{}>) {
  return <div className="flex flex-row flex-wrap gap-2">{children}</div>
}

function OptionItem({
  group,
  value,
  defaultChecked,
}: {
  group: string
  value: string
  defaultChecked: boolean
}) {
  return (
    <label
      className="
        option-item
        border-1 border-neutral-100 bg-neutral-50 px-3 py-2 rounded-xl font-sora font-medium text-xs capitalize text-neutral-400
        has-checked:bg-primary/5 has-checked:border-primary has-checked:text-primary 
      "
    >
      {value}
      <input
        value={value}
        type="checkbox"
        id={value}
        name={group}
        defaultChecked={defaultChecked}
        hidden
      />
    </label>
  )
}

function OptionListSkeleton() {
  return (
    <OptionList>
      {Array(8)
        .fill(0)
        .map((_, index) => (
          <OptionItemSkeleton key={index} />
        ))}
    </OptionList>
  )
}

function OptionItemSkeleton() {
  const hiddenText = "x".repeat(5 + Math.floor(Math.random() * 12))
  return (
    <div
      className="
        font-sora text-xs text-transparent animate-pulse
        border-1 border-neutral-100 bg-neutral-50 px-3 py-2 rounded-xl 
      "
    >
      {hiddenText}
    </div>
  )
}
