import * as G from "@/components/group"

import { Card } from "@/features/business/components"
import type { Business } from "@/features/business/types"

type GroupProps = {
  businesses: readonly Business[]
  href: string
  name: string
}

export function Group({ businesses, href, name }: GroupProps) {
  return (
    <G.Root>
      <G.Header>
        <G.Title title={name} />
        <G.Control.ViewMore href={href} />
      </G.Header>

      <G.List>
        {businesses.slice(0, 5).map((b) => (
          <G.Item key={b.id}>
            <div className="size-60">
              <Card business={b} />
            </div>
          </G.Item>
        ))}
      </G.List>
    </G.Root>
  )
}
