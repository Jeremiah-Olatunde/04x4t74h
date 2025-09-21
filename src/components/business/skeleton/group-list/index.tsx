import * as Card from "@/components/business/card"
import * as Group from "@/components/group"
import * as GroupList from "@/components/group-list"

export default function () {
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
