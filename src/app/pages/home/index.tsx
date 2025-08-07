import { ChevronRight as IconChevronRight } from "lucide-react"
import { Link as WouterLink } from "wouter"

import * as Array from "Array"

import { GetRecommendations } from "@/components/card"
import { Header } from "./header"
import { Icon } from "@/components/icon"
import { Business } from "@/components/card"
import { mockBusiness } from "@/utils/mock"

export function Home() {
  const tags = [
    "Budget Friendly",
    "Plazzaa Picks",
    "Celebration",
    "Chill and Casual",
  ]

  return (
    <section className="flex flex-col">
      <Header />

      <section className="p-6">
        <GetRecommendations />

        <div className="h-8" />

        <div className="flex flex-col gap-8">
          {tags.map((tag) => {
            const businesses = Array.makeBy(3, mockBusiness)

            return (
              <section key={tag}>
                <header className="flex justify-between items-center">
                  <h2 className="font-sora text-neutral-700 font-medium ">
                    {tag}
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
                  {businesses.map((business) => (
                    <div key={business.id} className="w-60 shrink-0">
                      <Business
                        details={business}
                        status={Math.random() < 0.5 ? "saved" : "not-saved"}
                        handleSave={() => {}}
                      />
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
