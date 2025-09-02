import { Link as LinkWouter } from "wouter"
import { cva, type VariantProps } from "class-variance-authority"

import logoPrimary from "@/assets/icons/logo-primary.svg"
import logoWhite from "@/assets/icons/logo-white.svg"
import { tw } from "@/utils/tailwind"

const text = (function () {
  const base = tw`font-fredoka font-semibold capitalize`

  const purple = tw`text-black`
  const white = tw`text-white`
  const primary = purple

  const color = { purple, white, primary } as const

  const sm = tw``
  const md = tw`text-xl`
  const lg = tw`text-3xl`

  const size = { sm, md, lg } as const

  const variants = { color, size } as const

  return cva(base, { variants })
})()

const image = (function () {
  const base = tw``

  const sm = tw`size-4`
  const md = tw`size-6`
  const lg = tw`size-8`

  const variants = { size: { sm, md, lg } } as const

  return cva(base, { variants })
})()

type TextVariants = VariantProps<typeof text>
export type TextVariantProps = {
  size: NonNullable<TextVariants["size"]>
  color: NonNullable<TextVariants["color"]>
}

type ImageVariants = VariantProps<typeof image>
export type ImageVariantProps = {
  size: NonNullable<ImageVariants["size"]>
}

export function Logo({
  size,
  color,
}: {
  size: "sm" | "md" | "lg"
  color: "purple" | "primary" | "white"
}) {
  return (
    <LinkWouter
      href="~/home"
      className="w-min-content flex flex-row items-center justify-center"
    >
      <img
        src={color === "white" ? logoWhite : logoPrimary}
        className={image({ size })}
      />
      <span className={text({ color, size })}>plazzaa</span>
    </LinkWouter>
  )
}

export function LogoText() {
  return (
    <LinkWouter
      href="~/home"
      className="w-min-content flex flex-row items-center justify-center"
    >
      <img src={logoPrimary} className="size-6" />
    </LinkWouter>
  )
}
