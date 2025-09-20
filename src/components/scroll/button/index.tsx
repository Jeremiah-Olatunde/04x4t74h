import { ArrowUpIcon } from "lucide-react"
import { useEffect, useState } from "react"

export function Top() {
  const [top, setTop] = useState(true)

  useEffect(() => {
    const handler = () => setTop(window.scrollY === 0)
    handler()

    addEventListener("scroll", handler)
    return () => removeEventListener("scroll", handler)
  }, [])

  if (top) {
    return null
  }

  return (
    <div className="fixed bottom-0 right-0 p-4 z-10">
      <button
        type="button"
        className="p-2 rounded-full bg-primary  flex place-items-center"
        onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUpIcon className="text-white size-6" />
      </button>
    </div>
  )
}
