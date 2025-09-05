import { tw } from "@/utils/tailwind"
import { cva, type VariantProps } from "class-variance-authority"

import type { PropsWithChildren } from "react"

const base = tw`w-full flex items-center justify-center font-sora font-semibold capitalize cursor-pointer border-1 border-transparent`

const red = tw`bg-red-600 text-white`
const purple = tw`bg-primary text-white`
const yellow = tw`bg-secondary text-neutral-600`
const neutral = tw`bg-neutral-100 text-neutral-600`
const white = tw`bg-white text-neutral-600 !border-neutral-300`
const light = tw`bg-white text-neutral-400 !border-neutral-300`

const sm = tw`rounded-sm px-1.5 py-1 text-xs`
const md = tw`rounded-md p-2 text-xs`
const lg = tw`rounded-lg p-4 text-sm`

const variants = {
  color: { red, purple, yellow, neutral, white, light },
  size: { sm, md, lg },
} as const

const badge = cva(base, { variants })

type Variants = VariantProps<typeof badge>
export type BadgeVariantProps = {
  size: NonNullable<Variants["size"]>
  color: NonNullable<Variants["color"]>
}

type Props = PropsWithChildren<BadgeVariantProps>

export function Badge({ children, color, size }: Props) {
  return <div className={badge({ color, size })}>{children}</div>
}
