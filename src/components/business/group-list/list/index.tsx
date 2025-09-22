import { useState } from "react"

import type { Businesses } from "@/types/business"

import * as Card from "@/components/business/card"
import * as Group from "@/components/group"
import * as GroupList from "@/components/group-list"

type ListProps = { items: readonly (readonly [string, string, Businesses])[] }

export function List({ items }: ListProps) {
  const increment = 5
  const [show, setShow] = useState(5)

  return (
    <GroupList.Root>
      {items.slice(0, show).map(([name, href, businesses]) => {
        return (
          <GroupList.Group key={name}>
            <Group.Root>
              <Group.Header>
                <Group.Title title={name} />
                <Group.Control.ViewMore href={href} />
              </Group.Header>

              <Group.List>
                {businesses.slice(0, show).map((b) => (
                  <Group.Item key={b.id}>
                    <div className="size-60">
                      <Card.Small business={b} />
                    </div>
                  </Group.Item>
                ))}
              </Group.List>
            </Group.Root>
          </GroupList.Group>
        )
      })}

      {show < items.length && (
        <GroupList.Control.ShowMore onClick={() => setShow(show + increment)} />
      )}
    </GroupList.Root>
  )
}
