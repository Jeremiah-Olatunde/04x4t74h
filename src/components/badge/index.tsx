import { cva, type VariantProps } from "class-variance-authority"

import { tw } from "@/utils/tailwind"

const cvaContainer = (function () {
  const base = tw`flex items-center justify-center rounded-s-full rounded-e-full px-3 py-1`
  const primary = tw`bg-primary/10`
  const secondary = tw`bg-secondary`
  const neutral = tw`bg-neutral-50`
  const red = tw`bg-red-50`
  const green = tw`bg-green-50`

  const variants = {
    variant: { primary, secondary, neutral, red, green },
  } as const
  const defaultVariants = { variant: "neutral" } as const

  return cva(base, { variants, defaultVariants })
})()

const cvaTypography = (function () {
  const base = tw`font-sora text-xxs font-medium whitespace-nowrap`
  const primary = tw`text-primary`
  const secondary = tw`text-neutral-600`
  const neutral = tw`text-neutral-600`
  const red = tw`text-red-600`
  const green = tw`text-green-600`

  const variants = {
    variant: { primary, secondary, neutral, red, green },
  } as const
  const defaultVariants = { variant: "neutral" } as const

  return cva(base, { variants, defaultVariants })
})()

export function Badge({
  text,
  variant,
}: {
  text: string
  variant: VariantProps<typeof cvaContainer>["variant"]
}) {
  return (
    <div className={cvaContainer({ variant })}>
      <span className={cvaTypography({ variant })}>{text}</span>
    </div>
  )
}
