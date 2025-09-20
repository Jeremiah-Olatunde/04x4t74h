import { type PropsWithChildren, useEffect } from "react"

export function Top({ children }: PropsWithChildren<{}>) {
  useEffect(() => scrollTo(0, 0), [])
  return <>{children}</>
}
