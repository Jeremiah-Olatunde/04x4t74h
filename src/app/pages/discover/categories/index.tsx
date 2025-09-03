import * as Placeholder from "@/components/placeholder"

export function Categories() {
  return (
    <Placeholder.Root>
      <Placeholder.Header>
        <Placeholder.Title>Categories</Placeholder.Title>
        <Placeholder.Subtitle>Browse by type</Placeholder.Subtitle>
      </Placeholder.Header>

      <Placeholder.Content>
        Explore businesses organized into categories that help you find exactly
        what you’re looking for. From dining and shopping to services and
        activities, categories make discovery simple. This feature is still in
        progress—check back soon to explore by category
      </Placeholder.Content>

      <div className="flex justify-start gap-1">
        <Placeholder.Back />
        <Placeholder.Home />
      </div>
    </Placeholder.Root>
  )
}
