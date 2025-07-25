import { cva, type VariantProps } from "class-variance-authority"

import { tw } from "@/utils/tailwind"
import { Link as LinkWouter } from "wouter"

const base = tw`flex w-full cursor-pointer items-center justify-center rounded-xl p-4 font-sora text-sm font-medium`
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

type LinkProps = {
  tag: "link"
  href: string
  text: string
  variant?: VariantProps<typeof style>["variant"]
}

type ButtonProps = {
  tag: "button"
  text: string
  value?: string
  type: "submit" | "button"
  handleClick: (value: string) => void
  variant?: VariantProps<typeof style>["variant"]
}

export function Button(props: ButtonProps | LinkProps) {
  if (props.tag === "button") {
    return (
      <button
        type={props.type}
        className="w-full"
        onClick={() => props.handleClick(props.value ?? props.text)}
      >
        <ButtonBase text={props.text} variant={props.variant} />
      </button>
    )
  }

  return (
    <LinkWouter href={props.href} className="w-full">
      <ButtonBase text={props.text} variant={props.variant} />
    </LinkWouter>
  )
}

function ButtonBase({
  text,
  variant,
}: {
  text: string
  variant: VariantProps<typeof style>["variant"]
}) {
  return <div className={style({ variant })}>{text}</div>
}
