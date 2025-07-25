import { type LucideIcon } from "lucide-react"
import { AccessibleIcon } from "radix-ui"

export function Icon({
  icon: Icon,
  label,
}: {
  icon: LucideIcon
  label: string
}) {
  return (
    <AccessibleIcon.Root label={label}>
      <Icon className="size-5 text-neutral-400" />
    </AccessibleIcon.Root>
  )
}
