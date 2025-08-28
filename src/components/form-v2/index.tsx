import type { PropsWithChildren } from "react"
import { EyeOff as IconEyeOff, Eye as IconEye } from "lucide-react"
import { ScrollArea } from "@base-ui-components/react/scroll-area"

import { Pill } from "@/components/pill"
import { Icon } from "@/components/icon"

type FormGroupProps = { name: string }

export function FormGroup({
  name,
  children,
}: PropsWithChildren<FormGroupProps>) {
  return (
    <fieldset name={name} className="contents">
      <div className="min-w-0 w-full flex flex-col gap-6 grow-1">
        {children}
      </div>
    </fieldset>
  )
}

type FormGroupTitle = { description: string; title: string }

export function FormGroupTitle({
  children,
  description,
  title,
}: PropsWithChildren<FormGroupTitle>) {
  return (
    <div>
      <legend>
        <header className="flex flex-col items-center gap-1">
          <h1>
            <span className="font-sora text-xl font-bold text-neutral-600">
              {title}
            </span>
          </h1>

          <p className="font-sora text-sm text-neutral-400">{description}</p>

          {children}
        </header>
      </legend>
    </div>
  )
}

type FieldProps = {}

export function Field({ children }: PropsWithChildren<FieldProps>) {
  return <div className="flex flex-col gap-2">{children}</div>
}

type FieldLabelProps = Record<"children" | "htmlFor", string>

export function FieldLabel({ htmlFor, children }: FieldLabelProps) {
  return (
    <label htmlFor={htmlFor} className="justify-start flex items-center">
      <span className="font-sora text-sm font-medium capitalize text-neutral-600">
        {children}
      </span>
    </label>
  )
}

type FieldDescriptionProps = Record<"children", string>

export function FieldDescription({ children }: FieldDescriptionProps) {
  return (
    <p className="text-neutral-400 text-xs font-sora font-light pb-2">
      {children}
    </p>
  )
}

type FieldErrorProps = Record<"children", string>

export function FieldError({ children }: FieldErrorProps) {
  return (
    <Pill size="sm" color="red">
      {children}
    </Pill>
  )
}

export function FieldErrors({ errors }: { errors: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {errors.map((error) => (
        <div key={error} className="snap-start">
          <FieldError>{error}</FieldError>
        </div>
      ))}
    </div>
  )
}

type FieldPasswordToggleProps = {
  visible: boolean
  onVisibleChange: (pressed: boolean) => void
}

export function FieldPasswordToggle({
  visible: visible,
  onVisibleChange,
}: FieldPasswordToggleProps) {
  return (
    <button
      onClick={() => onVisibleChange(!visible)}
      type="button"
      className="cursor-pointer"
    >
      {visible ? (
        <Icon color="neutral" icon={IconEye} size="md" />
      ) : (
        <Icon color="neutral" icon={IconEyeOff} size="md" />
      )}
    </button>
  )
}

export { Input as FieldInput, TextArea as FieldTextArea } from "./input"
export { Form } from "@base-ui-components/react/form"
