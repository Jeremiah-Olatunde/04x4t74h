import { Tab } from "@/components/tabs/skeleton"
import * as T from "@/components/tabs"

export function Tabs() {
  const max = 8
  const min = 15
  const textLength = min + Math.random() * (max - min)
  const text = "-".repeat(textLength)

  return (
    <T.Root>
      {Array(length)
        .fill(0)
        .map((_, i) => {
          return <Tab text={text} key={i} />
        })}
    </T.Root>
  )
}
