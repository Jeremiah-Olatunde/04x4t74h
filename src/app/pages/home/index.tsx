import { faker } from "@faker-js/faker"

import * as Array from "Array"
import { mockBusiness } from "@/utils/mock"

import { Hero } from "./hero"
import * as BusinessList from "@/components/business/list"
import { GetRecommendations } from "@/components/card"

export function Home() {
  return (
    <section className="flex flex-col">
      <Hero />

      <section className="p-6">
        <GetRecommendations />

        <div className="h-8" />

        <div className="flex flex-col gap-8">
          {Array.makeBy(5, (index) => {
            const adjective = faker.company.buzzAdjective()
            const noun = faker.company.buzzNoun()
            const tag = `${adjective} ${noun}`
            const businesses = Array.makeBy(10, mockBusiness)

            return (
              <BusinessList.Root key={index}>
                <BusinessList.Header>
                  <BusinessList.Title title={tag} />
                  <BusinessList.Link href="#" />
                </BusinessList.Header>

                <BusinessList.Slider businesses={businesses} />
              </BusinessList.Root>
            )
          })}
        </div>
      </section>
    </section>
  )
}
