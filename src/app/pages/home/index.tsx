import { GetRecommendations } from "@/components/card"
import { Header } from "./header"

export function Home() {
  return (
    <section className="flex flex-col">
      <Header />

      <section className="p-6">
        <GetRecommendations />
      </section>
    </section>
  )
}
