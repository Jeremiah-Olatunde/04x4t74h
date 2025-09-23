import { useState } from "react"

import type { Businesses } from "@/types/business"

import * as GL from "@/components/group-list"

import { Group } from "@/features/business/components/group"

type GroupListProps = {
  items: readonly (readonly [string, string, Businesses])[]
}

export function GroupList({ items }: GroupListProps) {
  const increment = 5
  const [show, setShow] = useState(5)

  return (
    <GL.Root>
      {items.slice(0, show).map(([name, href, businesses]) => {
        return (
          <GL.Group key={name}>
            <Group businesses={businesses} href={href} name={name} />
          </GL.Group>
        )
      })}

      {show < items.length && (
        <GL.Control.ShowMore onClick={() => setShow(show + increment)} />
      )}
    </GL.Root>
  )
}
