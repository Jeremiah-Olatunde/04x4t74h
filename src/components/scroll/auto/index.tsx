import { useEffect } from "react"

export function Top() {
  useEffect(() => scrollTo(0, 0), [])
  return null
}
