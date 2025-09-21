import { useState } from "react"

import type { BusinessesGrouped } from "@/types/business"

import * as Group from "@/components/group"
import * as GroupList from "@/components/group-list"
import * as Card from "@/components/business/card"

type Props = { list: BusinessesGrouped }
export default function ({ list }: Props) {
  const increment = 5
  const [show, setShow] = useState(5)

  return (
    <GroupList.Root>
      {list.slice(0, show).map(([name, businesses]) => {
        return (
          <GroupList.Group key={name}>
            <Group.Root>
              <Group.Header>
                <Group.Title title={name} />
                <Group.Control.ViewMore href={`/explore/tags/${name}`} />
              </Group.Header>

              <Group.List>
                {businesses.slice(0, show).map((b) => (
                  <Group.Item key={b.id}>
                    <Card.Small business={b} />
                  </Group.Item>
                ))}
              </Group.List>
            </Group.Root>
          </GroupList.Group>
        )
      })}

      <GroupList.Control.ShowMore onClick={() => setShow(show + increment)} />
    </GroupList.Root>
  )
}
