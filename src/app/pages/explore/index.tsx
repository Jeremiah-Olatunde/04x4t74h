export { Tags } from "./tags"
export { Tag } from "./tags/[name]"
export { Cities } from "./cities"
export { City } from "./cities/[name]"
export { Categories } from "./categories"
export { Category } from "./categories/[name]"

import * as Placeholder from "@/components/placeholder"

export function Explore() {
  return (
    <Placeholder.Root>
      <Placeholder.Header>
        <Placeholder.Title>Explore</Placeholder.Title>
        <Placeholder.Subtitle>Choose Your Path</Placeholder.Subtitle>
      </Placeholder.Header>

      <Placeholder.Content>
        Discover businesses the way you want. Browse by tags to find businesses
        with shared themes, explore by categories to see different types, or
        navigate by city to uncover local favorites. This page is still in
        progress—soon you’ll be able to pick how you explore.
      </Placeholder.Content>

      <div className="flex justify-start gap-1">
        <Placeholder.Back />
        <Placeholder.Home />
      </div>
    </Placeholder.Root>
  )
}
