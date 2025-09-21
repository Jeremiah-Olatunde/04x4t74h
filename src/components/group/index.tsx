import { ScrollArea } from "@base-ui-components/react/scroll-area"
import type { PropsWithChildren } from "react"

export * as Control from "./control"
export * as Skeleton from "./skeleton"

export function Root({ children }: PropsWithChildren<{}>) {
  return <section className="flex flex-col gap-4">{children}</section>
}

export function Header({ children }: PropsWithChildren<{}>) {
  return (
    <header className="flex justify-between items-center">{children}</header>
  )
}

type TitleProps = Record<"title", string>

export function Title({ title }: TitleProps) {
  return (
    <h2 className="capitalize font-sora text-neutral-700 font-medium text-lg">
      {title}
    </h2>
  )
}

type ListProps = {}

export function List({ children }: PropsWithChildren<ListProps>) {
  return (
    <ScrollArea.Root>
      <ScrollArea.Viewport className="snap-x snap-mandatory flex gap-1">
        <ScrollArea.Content className="contents">
          <ul className="contents">{children}</ul>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
    </ScrollArea.Root>
  )
}

type ItemProps = {}

export function Item({ children }: PropsWithChildren<ItemProps>) {
  return <li className="snap-start">{children}</li>
}
