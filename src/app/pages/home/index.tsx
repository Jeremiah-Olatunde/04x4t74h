import { LoaderCircleIcon } from "lucide-react"
import { faker } from "@faker-js/faker"

import * as Array from "Array"

import { Hero } from "./hero"
import * as BusinessList from "@/components/business/list"
import { GetRecommendations } from "@/components/card"
import { useBusinesses } from "@/hooks/business"
import { isFailure, isInitial, isPending } from "@/lib/remote-data"

export function Home() {
  const remoteData = useBusinesses()

  if (isInitial(remoteData) || isPending(remoteData)) {
    return (
      <section className="h-screen w-screen flex justify-center items-center">
        <LoaderCircleIcon className="text-primary size-16 animate-spin" />
      </section>
    )
  }

  if (isFailure(remoteData)) {
    throw remoteData.error
  }

  const businesses = remoteData.value

  return (
    <section className="flex flex-col">
      <Hero />

      <section className="p-6">
        <GetRecommendations />

        <div className="h-8" />

        <div className="flex flex-col gap-8">
          {Array.makeBy(8, (index) => {
            const adjective = faker.company.buzzAdjective()
            const noun = faker.company.buzzNoun()
            const tag = `${adjective} ${noun}`

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
