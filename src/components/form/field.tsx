import type { ReactNode } from "react"
import { cva, type VariantProps } from "class-variance-authority"

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

export function FormField({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-2">{children}</div>
}

export function FieldLabel({
  htmlFor,
  text,
}: {
  htmlFor: string
  text: string
}) {
  return (
    <label htmlFor={htmlFor} className="justifi-center flex items-center">
      <span className="font-sora text-xs font-medium capitalize">{text}</span>
    </label>
  )
}

export function FieldStatus({
  status,
}: {
  status: "failure" | "success" | "pending" | "warning"
}) {
  switch (status) {
    case "warning":
      return (
        <Icon
          size="sm"
          icon={IconCircleAlert}
          label="field validation failed"
          variant="secondary"
        />
      )
    case "failure":
      return (
        <Icon
          size="sm"
          icon={IconCircleX}
          label="field validation failed"
          variant="red"
        />
      )
    case "success":
      return (
        <Icon
          size="sm"
          icon={CircleCheck}
          label="field validation succeeded"
          variant="green"
        />
      )
    case "pending":
      return (
        <div className="animate-spin">
          <Icon
            size="sm"
            icon={IconLoaderCircle}
            label="field validation in progress"
            variant="neutral"
          />
        </div>
      )
  }
}

const base = tw`flex justify-center gap-2 rounded-xl border-1 p-4 outline-2 transition has-focus:shadow-md/10`
const neutral = tw`border-neutral-200 outline-transparent has-focus:border-neutral-400 has-focus:outline-primary`
const failure = tw`border-red-300 outline-transparent has-focus:outline-red-600`
const success = tw`border-green-300 outline-transparent has-focus:border-neutral-400 has-focus:outline-green-600`
const warning = tw`border-secondary outline-transparent has-focus:border-neutral-400 has-focus:outline-secondary`

const variants = {
  variant: { neutral, failure, success, warning },
} as const

const defaultVariants = { variant: "neutral" } as const

const styles = cva(base, { variants, defaultVariants })

export function FieldInput({
  autoComplete,
  name,
  type,
  placeholder,
  children,
  variant,
}: {
  autoComplete?: string
  name: string
  type: "text" | "email" | "password" | "tel"
  placeholder: string
  children?: ReactNode
  variant?: VariantProps<typeof styles>["variant"]
}) {
  return (
    <div className={styles({ variant })}>
      <input
        id={name}
        name={name}
        autoComplete={autoComplete}
        type={type}
        placeholder={placeholder}
        className="w-0 grow border-none font-sora text-xs text-neutral-600 outline-none placeholder:text-neutral-400"
      />
      <div className="flex items-center justify-center gap-1">{children}</div>
    </div>
  )
}

export function TogglePasswordVisibility({
  visible,
  handleClick,
}: {
  visible: boolean
  handleClick: () => void
}) {
  return (
    <button type="button" onClick={handleClick} className="cursor-pointer">
      {visible ? (
        <Icon icon={IconEye} label="toggle password" />
      ) : (
        <Icon icon={IconEyeOff} label="toggle password" />
      )}
    </button>
  )
}

export function FieldErrors({ errors }: { errors: readonly string[] }) {
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
