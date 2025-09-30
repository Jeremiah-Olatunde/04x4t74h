import { ButtonBadge } from "@/components/button"
import * as GroupList from "@/components/group-list"
import { PlusIcon } from "lucide-react"
import { useState } from "react"

type NavProps = { items: readonly (readonly [string, string, ...unknown[]])[] }

export function Nav({ items }: NavProps) {
  const [showAll, setShowAll] = useState(items.length < 5)
  return (
    <GroupList.Nav.Root>
      {items.slice(0, showAll ? Infinity : 5).map(([name, href]) => {
        return (
          <GroupList.Nav.Tab key={name} href={href}>
            {name}
          </GroupList.Nav.Tab>
        )
      })}
      {!showAll && (
        <div>
          <ButtonBadge size="sm" color="light" onClick={() => setShowAll(true)}>
            <PlusIcon className="size-4" />
          </ButtonBadge>
        </div>
      )}
    </GroupList.Nav.Root>
  )
}
