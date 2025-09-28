import { useSearchParams } from "wouter"

import * as Form from "@/components/filter"
import * as Filter from "@/features/business/components/filter"

import * as Scroll from "@/components/scroll"

export function Filters() {
  const [params] = useSearchParams()
  const term = params.get("term")
  const base = "/search"

  return (
    <section className="min-h-screen">
      <Scroll.Auto.Top />
      <Scroll.Button.Top />

      <Form.Form>
        <Form.Header.Root>
          <Form.Header.Back />
          <Form.Header.Title term={term ?? ""} />
          <Form.Header.Apply href={`${base}?${params.toString()}`} />
        </Form.Header.Root>

        <Form.Reset href={`${base}/filters?term=${term}`} />

        <Filter.Categories />
        <Filter.Subcategories />
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
