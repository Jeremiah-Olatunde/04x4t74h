import { ButtonBadge } from "@/components/button"
import type { ComponentPropsWithRef } from "react"

export * as Skeleton from "./skeleton"

type ShowMoreProps = ComponentPropsWithRef<"button">

export function ShowMore(props: ShowMoreProps) {
  return (
    <ButtonBadge {...props} color="neutral" size="md" type="button">
      Show More
    </ButtonBadge>
  )
}
