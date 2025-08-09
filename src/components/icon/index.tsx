import { tw } from "@/utils/tailwind"
import { cva, type VariantProps } from "class-variance-authority"

import { type LucideIcon } from "lucide-react"

const base = tw``

const neutral = tw`text-neutral-400`
const purple = tw`text-primary`
const yellow = tw`text-secondary`
const green = tw`text-green-600`
const red = tw`text-red-600`

const xs = tw`size-3`
const sm = tw`size-4`
const md = tw`size-5`
const lg = tw`size-6`

const variants = {
  color: { neutral, purple, yellow, green, red },
  size: { xs, sm, md, lg },
} as const

const styles = cva(base, { variants })
type Variants = VariantProps<typeof styles>
type IconVariantProps = {
  color: NonNullable<Variants["color"]>
  size: NonNullable<Variants["size"]>
}

type IconProps = { icon: LucideIcon } & IconVariantProps

export function Icon({ icon: Icon, color, size }: IconProps) {
  return <Icon className={styles({ color, size })} />
}
