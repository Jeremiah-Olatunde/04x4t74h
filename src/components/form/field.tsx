import type { PropsWithChildren } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Input } from "@base-ui-components/react/input"

import * as Array from "Array"
import * as Function from "Function"

import {
  Eye as IconEye,
  EyeOff as IconEyeOff,
  LoaderCircle as IconLoaderCircle,
  CircleAlert as IconCircleAlert,
  CircleCheck,
  CircleX as IconCircleX,
} from "lucide-react"

import { tw } from "@/utils/tailwind"

import { Badge } from "@/components/badge"
import { Icon } from "@/components/icon"

export function FormField({ children }: PropsWithChildren<{}>) {
  return <div className="flex flex-col gap-2">{children}</div>
}

type FieldLabelProps = Record<"htmlFor" | "text", string>

export function FieldLabel({ htmlFor, text }: FieldLabelProps) {
  return (
    <label htmlFor={htmlFor} className="justify-start flex items-center">
      <span className="font-sora text-xs font-medium capitalize">{text}</span>
    </label>
  )
}

type FieldIndicatorState = "failure" | "success" | "pending" | "warning"
type FieldIndicatorProps = Record<"state", FieldIndicatorState>

export function FieldIndicator({ state }: FieldIndicatorProps) {
  switch (state) {
    case "warning":
      return <Icon size="sm" icon={IconCircleAlert} color="yellow" />
    case "failure":
      return <Icon size="sm" icon={IconCircleX} color="red" />
    case "success":
      return <Icon size="sm" icon={CircleCheck} color="green" />
    case "pending":
      return (
        <div className="animate-spin">
          <Icon size="sm" icon={IconLoaderCircle} color="neutral" />
        </div>
      )
  }
}

const base = tw`flex justify-center gap-2 rounded-xl border-1  outline-2 transition has-focus:shadow-md/10`
const neutral = tw`border-neutral-200 outline-transparent has-focus:border-neutral-400 has-focus:outline-primary`
const red = tw`border-red-300 outline-transparent has-focus:outline-red-600`
const green = tw`border-green-300 outline-transparent has-focus:border-neutral-400 has-focus:outline-green-600`
const yellow = tw`border-secondary outline-transparent has-focus:border-neutral-400 has-focus:outline-secondary`

const variants = {
  color: { neutral, red, green, yellow },
} as const

const styles = cva(base, { variants })
type Variants = VariantProps<typeof styles>
type FieldInputVariantProps = {
  color: NonNullable<Variants["color"]>
}
type FieldInputProps = {
  autoComplete: string
  name: string
  placeholder: string
  type: "text" | "email" | "password" | "tel"
}

export function FieldInput({
  autoComplete,
  name,
  type,
  placeholder,
  children,
  color,
}: PropsWithChildren<FieldInputProps & FieldInputVariantProps>) {
  return (
    <div className={styles({ color })}>
      <Input
        id={name}
        name={name}
        autoComplete={autoComplete}
        type={type}
        placeholder={placeholder}
        className="w-0 p-4 grow border-none font-sora text-xs text-neutral-600 outline-none placeholder:text-neutral-400"
      />
      {children && (
        <div className="px-4 flex items-center justify-center">{children}</div>
      )}
    </div>
  )
}

type TogglePasswordVisibilityProps = {
  visible: boolean
  handleClick: () => void
}

export function TogglePasswordVisibility({
  visible,
  handleClick,
}: TogglePasswordVisibilityProps) {
  return (
    <button type="button" onClick={handleClick} className="cursor-pointer">
      {visible ? (
        <Icon color="neutral" icon={IconEye} size="md" />
      ) : (
        <Icon color="neutral" icon={IconEyeOff} size="md" />
      )}
    </button>
  )
}

type FieldErrorsProps = Record<"errors", readonly string[]>

export function FieldErrors({ errors }: FieldErrorsProps) {
  return (
    <ul className="flex flex-row flex-wrap gap-2">
      {Function.pipe(errors, Array.map(FieldErrorItem))}
    </ul>
  )
}

function FieldErrorItem(error: string) {
  return (
    <li>
      <Badge color="red" shade="light" shape="pill" size="sm">
        {error}
      </Badge>
    </li>
  )
}
