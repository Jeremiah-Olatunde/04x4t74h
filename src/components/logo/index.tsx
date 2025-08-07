import { cva } from "class-variance-authority"

import logoPrimary from "@/assets/icons/logo-primary.svg"
import logoWhite from "@/assets/icons/logo-white.svg"
import { tw } from "@/utils/tailwind"

const text = (function () {
  const base = tw`font-fredoka font-semibold capitalize`

  const purple = tw`text-black`
  const white = tw`text-white`
  const primary = purple

  const variant = { purple, white, primary } as const

  const sm = tw``
  const lg = tw`text-3xl`

  const size = { sm, lg } as const

  const variants = { variant, size } as const
  const defaultVariants = { size: "lg", variant: "primary" } as const

  return cva(base, { variants, defaultVariants })
})()

const image = (function () {
  const base = tw``

  const sm = tw`size-4`
  const lg = tw`size-8`

  const variants = { size: { sm, lg } } as const
  const defaultVariants = { size: "lg" } as const

  return cva(base, { variants, defaultVariants })
})()

export function Logo({
  size,
  variant,
}: {
  size?: "sm" | "lg"
  variant?: "purple" | "primary" | "white"
}) {
  return (
    <div className="w-min-content flex flex-row items-center justify-center">
      <img
        src={variant === "white" ? logoWhite : logoPrimary}
        className={image({ size })}
      />
      <span className={text({ variant, size })}>plazzaa</span>
    </div>
  )
}
