import { useSearchParams } from "wouter"

import * as Form from "@/components/filter"
import * as Filter from "@/features/business/components/filter"

import { Topbar } from "@/components/topbar"
import * as Scroll from "@/components/scroll"
import * as Header from "@/components/header"

export function Filters() {
  const [searchParams] = useSearchParams()
  const term = searchParams.get("term")

  return (
    <section className="min-h-screen">
      <Scroll.Auto.Top />
      <Scroll.Button.Top />

      <Topbar />

      <Form.Form>
        <Header.Root>
          <Header.Content>
            <Header.Title>Filters</Header.Title>
            <Header.Subtitle>
              <span>Filter results for </span>
              <span className="font-semibold">"{term}"</span>
            </Header.Subtitle>
          </Header.Content>

          <Header.Control.Root>
            <Header.Control.Apply
              href={`/search/results?${searchParams.toString()}`}
            />
            <Header.Control.Reset
              href={`/search/results/filters?term=${term}`}
            />
          </Header.Control.Root>
        </Header.Root>

        <div />

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
