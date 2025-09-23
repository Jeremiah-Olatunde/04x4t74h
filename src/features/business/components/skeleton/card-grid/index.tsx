import { type PropsWithChildren } from "react"

import { Skeleton } from "@/features/business/components"

export function CardGrid() {
  return (
    <div className="flex flex-col gap-4">
      <Root>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          return (
            <Item key={i}>
              <div className="h-60">
                <Skeleton.Card />
              </div>
            </Item>
          )
        })}
      </Root>
      <ShowMore />
      <div />
    </div>
  )
}

type RootProps = {}
function Root({ children }: PropsWithChildren<RootProps>) {
  return <ul className="grid grid-cols-2 gap-2">{children}</ul>
}

type ItemProps = {}
function Item({ children }: PropsWithChildren<ItemProps>) {
  return <li>{children}</li>
}

export function ShowMore() {
  return (
    <div className="px-1.5 py-1 font-sora font-semibold capitalize text-transparent bg-neutral-100 border-1 border-neutral-200 animate-pulse rounded-sm">
      Show More
    </div>
  )
}
