import * as GroupList from "@/components/group-list"

type NavProps = { items: readonly (readonly [string, string, ...unknown[]])[] }

export function Nav({ items }: NavProps) {
  return (
    <GroupList.Nav.Root>
      {items.map(([name, href]) => {
        return (
          <GroupList.Nav.Tab key={name} href={href}>
            {name}
          </GroupList.Nav.Tab>
        )
      })}
    </GroupList.Nav.Root>
  )
}
