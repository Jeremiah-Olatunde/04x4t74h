import { faker } from "@faker-js/faker"
import { Link as WouterLink } from "wouter"
import { ChevronRight as IconChevronRight } from "lucide-react"

import * as Array from "Array"

import { GetRecommendations } from "@/components/card"
import { Header } from "./header"
import { Icon } from "@/components/icon"
import { Business } from "@/components/card"
import { mockBusiness } from "@/utils/mock"

export function Home() {
  return (
    <section className="flex flex-col">
      <Header />

      <section className="p-6">
        <GetRecommendations />

        <div className="h-8" />

        <div className="flex flex-col gap-8">
          {Array.makeBy(5, (index) => {
            return (
              <section key={index}>
                <header className="flex justify-between items-center">
                  <h2 className="capitalize font-sora text-neutral-700 font-medium ">
                    {faker.company.buzzAdjective()} {faker.company.buzzNoun()}
                  </h2>

                  <WouterLink href={"#"}>
                    <div className="rounded-lg bg-neutral-100 p-2 flex justify-center items-center">
                      <Icon
                        size="sm"
                        icon={IconChevronRight}
                        label="see more budget friendly businesses"
                      />
                    </div>
                  </WouterLink>
                </header>

                <div className="h-4" />

                <div className="flex gap-2 overflow-x-scroll no-scrollbar">
                  {Array.makeBy(3, mockBusiness).map((business) => (
                    <div key={business.id} className="w-60 shrink-0">
                      <Business details={business} />
                    </div>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </section>
    </section>
  )
}
