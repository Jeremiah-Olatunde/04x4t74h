import * as Placeholder from "@/components/placeholder"
import { PathParameterError } from "@/lib/errors/ui"
import { useParams } from "wouter"

export function Tags() {
  const { tagName } = useParams()

  if (tagName === undefined) {
    const tag = "missing"
    const details = { tag } as const
    const parameter = "tagName"
    const schema = "/tags/:tagName"
    throw new PathParameterError(parameter, schema, details)
  }

  const formatted = tagName.charAt(0).toUpperCase() + tagName.slice(1)

  return (
    <Placeholder.Root>
      <Placeholder.Header>
        <Placeholder.Title>{formatted}</Placeholder.Title>
        <Placeholder.Subtitle>Explore by tag.</Placeholder.Subtitle>
      </Placeholder.Header>

      <Placeholder.Content>
        {`
          Here you’ll find businesses tagged with ${formatted}. Filtering options will
          help you refine the list. This feature is still in progress—check back
          soon.
        `}
      </Placeholder.Content>
      <Placeholder.LinkHome />
    </Placeholder.Root>
  )
}
