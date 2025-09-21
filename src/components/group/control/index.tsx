import * as Clickable from "@/components/clickable"
import { ChevronRightIcon } from "lucide-react"

export * as Skeleton from "./skeleton"

type ViewMoreProps = Record<"href", string>

export function ViewMore({ href }: ViewMoreProps) {
  return (
    <Clickable.Badge as="link" color="neutral" href={href} size="md">
      <ChevronRightIcon className="text-neutral-400 size-4" />
    </Clickable.Badge>
  )
}
