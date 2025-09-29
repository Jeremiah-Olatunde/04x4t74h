import { useParams, useSearchParams } from "wouter"

import * as Form from "@/components/filter"
import * as Filter from "@/features/business/components/filter"

import * as Scroll from "@/components/scroll"
import { PathParameterError } from "@/lib/errors/ui"

export function Filters() {
  const [params] = useSearchParams()
  const { name } = useParams()

  if (name === undefined) {
    const tag = "missing"
    const details = { tag } as const
    const parameter = "name"
    const schema = "/discover/categories/:name/filters"
    throw new PathParameterError(parameter, schema, details)
  }

  const term = params.get("term")
  const base = `/discover/categories/${name}`

  return (
    <section className="min-h-screen">
      <Scroll.Auto.Top />
      <Scroll.Button.Top />

      <Form.Form>
        <Form.Header.Root>
          <Form.Header.Back />
          <Form.Header.Content.Root>
            <span>Filtering business under </span>
            <span className="capitalize font-semibold">{name}</span>
          </Form.Header.Content.Root>

          <Form.Header.Apply href={`${base}?${params.toString()}`} />
        </Form.Header.Root>

        <Form.Reset href={`${base}/filters?term=${term ?? ""}`} />

        <Filter.Tags />
        <Filter.Cities />
        <Filter.Towns />
        <Filter.Amenities />
        <Filter.PaymentOptions />
      </Form.Form>

      <div className="h-6" />
    </section>
  )
}
