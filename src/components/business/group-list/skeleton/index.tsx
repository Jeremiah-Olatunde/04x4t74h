import * as Card from "@/components/business/card"
import * as Group from "@/components/group"
import * as GroupList from "@/components/group-list"

export function List() {
  return (
    <GroupList.Root>
      {[0, 1, 2, 3, 4].map((i) => {
        return (
          <GroupList.Group key={i}>
            <Group.Root>
              <Group.Header>
                <Group.Skeleton.Title />
                <Group.Control.Skeleton.ViewMore />
              </Group.Header>

              <Group.List>
                {[0, 1, 2, 3, 4].map((i) => (
                  <Group.Item key={i}>
                    <Card.Skeleton.Small />
                  </Group.Item>
                ))}
              </Group.List>
            </Group.Root>
          </GroupList.Group>
        )
      })}
    </GroupList.Root>
  )
}

export function Nav({ length }: { length: number }) {
  const max = 8
  const min = 15
  const textLength = min + Math.random() * (max - min)
  const text = "-".repeat(textLength)

  return (
    <GroupList.Nav.Root>
      {Array(length)
        .fill(0)
        .map((_, i) => {
          return (
            <li key={i}>
              <div className="text-xs text-transparent p-1 h-6 bg-neutral-100 border-1 border-neutral-200 animate-pulse rounded-sm">
                {text}
              </div>
            </li>
          )
        })}
    </GroupList.Nav.Root>
  )
}
