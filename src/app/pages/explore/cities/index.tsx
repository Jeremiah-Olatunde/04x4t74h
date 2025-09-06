import * as Placeholder from "@/components/placeholder"

export function Cities() {
  return (
    <Placeholder.Root>
      <Placeholder.Header>
        <Placeholder.Title>Cities</Placeholder.Title>
        <Placeholder.Subtitle>Discover by location</Placeholder.Subtitle>
      </Placeholder.Header>

      <Placeholder.Content>
        Find businesses based on the city you’re in or exploring. From local
        favorites to hidden gems, browsing by city makes it easy to connect with
        what’s nearby. This feature is still in progress—check back soon to
        explore by city.
      </Placeholder.Content>

      <div className="flex justify-start gap-1">
        <Placeholder.Back />
        <Placeholder.Home />
      </div>
    </Placeholder.Root>
  )
}
