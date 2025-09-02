import { type PropsWithChildren, useEffect } from "react"

export function ScrollTop({ children }: PropsWithChildren<{}>) {
  useEffect(() => scrollTo(0, 0), [])
  return <>{children}</>
}
