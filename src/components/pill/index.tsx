import type { PropsWithChildren } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { tw } from "@/utils/tailwind"

const base = tw`w-fit inline-flex items-center justify-center font-sora font-semibold cursor-pointer rounded-s-full rounded-e-full`

const red = tw`bg-red-50 text-red-600`
const purple = tw`bg-primary/10 text-primary`
const yellow = tw`bg-secondary text-neutral-600`
const neutral = tw`bg-neutral-100 text-neutral-600`

const sm = tw`px-3 py-1 text-[10px]`
const md = tw`p-2 text-xs`
const lg = tw`p-4 text-sm`

const variants = {
  color: { red, purple, yellow, neutral },
  size: { sm, md, lg },
} as const

const pill = cva(base, { variants })
type Variants = VariantProps<typeof pill>
export type PillVariantProps = {
  size: NonNullable<Variants["size"]>
  color: NonNullable<Variants["color"]>
}

type Props = PropsWithChildren<PillVariantProps>

export function Pill({ children, color, size }: Props) {
  return <div className={pill({ color, size })}>{children}</div>
}
