import { tw } from "@/utils/tailwind"
import { cva, type VariantProps } from "class-variance-authority"

import { type LucideIcon } from "lucide-react"
import { AccessibleIcon } from "radix-ui"

const neutral = tw`text-neutral-400`
const primary = tw`text-primary`
const secondary = tw`text-secondary`
const green = tw`text-green-600`
const red = tw`text-red-600`

const xs = tw`size-3`
const sm = tw`size-4`
const md = tw`size-5`
const lg = tw`size-6`

const variants = {
  variant: { neutral, primary, secondary, green, red },
  size: { xs, sm, md, lg },
} as const

const defaultVariants = {
  variant: "neutral",
  size: "md",
} as const

const styles = cva("", { variants, defaultVariants })

export function Icon({
  icon: Icon,
  label,
  variant,
  size,
}: {
  icon: LucideIcon
  label: string
  variant?: VariantProps<typeof styles>["variant"]
  size?: VariantProps<typeof styles>["size"]
}) {
  return (
    <AccessibleIcon.Root label={label}>
      <Icon className={styles({ variant, size })} />
    </AccessibleIcon.Root>
  )
}
