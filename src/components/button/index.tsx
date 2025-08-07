import { cva, type VariantProps } from "class-variance-authority"

import { tw } from "@/utils/tailwind"
import { Link as LinkWouter } from "wouter"

const base = tw`flex w-full cursor-pointer items-center justify-center font-sora font-semibold`
const purple = tw`bg-primary text-white`
const yellow = tw`bg-secondary text-neutral-600`
const primary = purple
const secondary = yellow

const sm = tw`p-2 text-xs rounded-sm`
const lg = tw`p-4 text-sm rounded-xl`

const variants = {
  variant: {
    purple,
    yellow,
    primary,
    secondary,
  },
  size: {
    sm,
    lg,
  },
} as const

const defaultVariants = {
  variant: "purple",
  size: "lg",
} as const

const style = cva(base, { variants, defaultVariants })

type LinkProps = {
  tag: "link"
  href: string
  text: string
  variant?: VariantProps<typeof style>["variant"]
  size?: VariantProps<typeof style>["size"]
}

type ButtonProps = {
  tag: "button"
  text: string
  value?: string
  type: "submit" | "button"
  handleClick: (value: string) => void
  variant?: VariantProps<typeof style>["variant"]
  size?: VariantProps<typeof style>["size"]
}

export function Button(props: ButtonProps | LinkProps) {
  if (props.tag === "button") {
    return (
      <button
        type={props.type}
        className="w-full"
        onClick={() => props.handleClick(props.value ?? props.text)}
      >
        <ButtonBase
          text={props.text}
          variant={props.variant}
          size={props.size}
        />
      </button>
    )
  }

  return (
    <LinkWouter href={props.href} className="w-full">
      <ButtonBase text={props.text} variant={props.variant} size={props.size} />
    </LinkWouter>
  )
}

function ButtonBase({
  text,
  variant,
  size,
}: {
  text: string
  variant: VariantProps<typeof style>["variant"]
  size?: VariantProps<typeof style>["size"]
}) {
  return <div className={style({ variant, size })}>{text}</div>
}
