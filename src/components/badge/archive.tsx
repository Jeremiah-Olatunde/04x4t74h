import { tw } from "@/utils/tailwind"
import { cva, type VariantProps } from "class-variance-authority"
import type { PropsWithChildren } from "react"

const base = tw`w-full flex items-center justify-center font-sora font-semibold cursor-pointer`

const red = tw``
const purple = tw``
const yellow = tw``
const neutral = tw``

const pill = tw`rounded-s-full rounded-e-full`
const rounded = tw``

const sm = tw`px-3 py-1 text-xxs`
const md = tw`p-2 text-xs`
const lg = tw`p-4 text-sm`

const dark = tw``
const light = tw``

const variants = {
  color: { red, purple, yellow, neutral },
  size: { sm, md, lg },
  shade: { dark, light },
  shape: { pill, rounded },
} as const

const compoundVariants = [
  {
    color: `purple`,
    shade: `light`,
    class: `bg-primary/10 text-primary`,
  } as const,
  {
    color: `purple`,
    shade: `dark`,
    class: `bg-primary text-white`,
  } as const,
  {
    color: `yellow`,
    shade: `light`,
    class: `bg-[#fffbed] text-secondary`,
  } as const,
  {
    color: `yellow`,
    shade: `dark`,
    class: `bg-secondary text-black`,
  } as const,
  {
    color: `red`,
    shade: `light`,
    class: `bg-red-50 text-red-600`,
  } as const,
  {
    color: `red`,
    shade: `dark`,
    class: `bg-red-600 text-white`,
  } as const,
  {
    color: `neutral`,
    shade: `light`,
    class: `bg-neutral-100 text-black`,
  } as const,
  {
    color: `neutral`,
    shade: `dark`,
    class: `bg-neutral-600 text-white`,
  } as const,
  {
    size: `sm`,
    shape: `rounded`,
    class: `rounded-sm`,
  } as const,
  {
    size: `md`,
    shape: `rounded`,
    class: `rounded-md`,
  } as const,
  {
    size: `lg`,
    shape: `rounded`,
    class: `rounded-lg`,
  } as const,
]

const badge = cva(base, { variants, compoundVariants })
type Variants = VariantProps<typeof badge>
export type BadgeVariantProps = {
  size: NonNullable<Variants["size"]>
  shape: NonNullable<Variants["shape"]>
  shade: NonNullable<Variants["shade"]>
  color: NonNullable<Variants["color"]>
}

type Props = PropsWithChildren<BadgeVariantProps>

export function Badge({ children, color, shape, shade, size }: Props) {
  return <div className={badge({ color, shape, shade, size })}>{children}</div>
}
