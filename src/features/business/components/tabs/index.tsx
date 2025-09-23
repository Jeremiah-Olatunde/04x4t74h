import * as T from "@/components/tabs"

type TabsProps = {
  items: readonly (readonly [string, string, ...unknown[]])[]
}

export function Tabs({ items }: TabsProps) {
  return (
    <T.Root>
      {items.map(([name, href]) => {
        return (
          <T.Tab key={name} href={href}>
            {name}
          </T.Tab>
        )
      })}
    </T.Root>
  )
}
