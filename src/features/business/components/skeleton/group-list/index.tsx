import * as G from "@/components/group"
import * as GL from "@/components/group-list"

import { Skeleton } from "@/features/business/components"

export function GroupList() {
  return (
    <GL.Root>
      {[0, 1, 2, 3, 4].map((i) => {
        return (
          <GL.Group key={i}>
            <G.Root>
              <G.Header>
                <G.Skeleton.Title />
                <G.Control.Skeleton.ViewMore />
              </G.Header>

              <G.List>
                {[0, 1, 2, 3, 4].map((i) => (
                  <G.Item key={i}>
                    <div className="size-60">
                      <Skeleton.Card />
                    </div>
                  </G.Item>
                ))}
              </G.List>
            </G.Root>
          </GL.Group>
        )
      })}

      <GL.Control.Skeleton.ShowMore />
    </GL.Root>
  )
}
