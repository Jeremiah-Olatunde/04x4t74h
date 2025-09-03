import * as Placeholder from "@/components/placeholder"

export function Tags() {
  return (
    <Placeholder.Root>
      <Placeholder.Header>
        <Placeholder.Title>Tags</Placeholder.Title>
        <Placeholder.Subtitle>Explore by interest</Placeholder.Subtitle>
      </Placeholder.Header>

      <Placeholder.Content>
        Discover businesses grouped by tags that match your needs. From food and
        fashion to services and experiences, tags make it easy to browse by
        category. This feature is still in progress—check back soon to explore
        tagged collections.
      </Placeholder.Content>

      <div className="flex justify-start gap-1">
        <Placeholder.Back />
        <Placeholder.Home />
      </div>
    </Placeholder.Root>
  )
}
