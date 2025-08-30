import * as Placeholder from "@/components/placeholder"

export function Unexpected() {
  return (
    <Placeholder.Root>
      <Placeholder.Header>
        <Placeholder.Title>Error!</Placeholder.Title>
        <Placeholder.Subtitle>
          An unexpected error occured.
        </Placeholder.Subtitle>
      </Placeholder.Header>

      <Placeholder.Content>
        Oops, looks like something unexpected went wrong. Don’t worry—it happens
        sometimes. A quick refresh of the page might just fix it.
      </Placeholder.Content>
    </Placeholder.Root>
  )
}
