import { cva, type VariantProps } from "class-variance-authority"

import { tw } from "@/utils/tailwind"

type ButtonType = "submit" | "button"

type ButtonProps = {
  type: ButtonType
  text: string
  handleClick?: (text: string) => void
  variant?: VariantProps<typeof style>["variant"]
}

const base = tw`w-full cursor-pointer rounded-xl p-4 font-sora text-sm font-medium`
const purple = tw`bg-primary text-white`
const yellow = tw`bg-secondary text-neutral-600`
const primary = purple
const secondary = yellow

const variants = {
  variant: {
    purple,
    yellow,
    primary,
    secondary,
  },
} as const

const defaultVariants = {
  variant: "purple",
} as const

const style = cva(base, { variants, defaultVariants })

export function Button({ type, text, variant, handleClick }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={handleClick ? () => handleClick(text) : () => {}}
      className={style({ variant })}
    >
      {text}
    </button>
  )
}
