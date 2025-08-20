import type { PropsWithChildren } from "react"
import { EyeOff as IconEyeOff, Eye as IconEye } from "lucide-react"

import { Fieldset } from "@base-ui-components/react/fieldset"
import { Field as BuiField } from "@base-ui-components/react/field"
import { Toggle } from "@base-ui-components/react/toggle"

import { Pill } from "@/components/pill"
import { Icon } from "@/components/icon"

type FormGroupProps = {}

export function FormGroup({ children }: PropsWithChildren<FormGroupProps>) {
  return (
    <Fieldset.Root className="flex flex-col gap-6">{children}</Fieldset.Root>
  )
}

type FormGroupTitle = { description: string; title: string }

export function FormGroupTitle({
  children,
  description,
  title,
}: PropsWithChildren<FormGroupTitle>) {
  return (
    <Fieldset.Legend>
      <header className="flex flex-col items-center gap-1">
        <h1>
          <span className="font-sora text-xl font-bold text-neutral-600">
            {title}
          </span>
        </h1>

        <p className="font-sora text-sm text-neutral-400">{description}</p>

        {children}
      </header>
    </Fieldset.Legend>
  )
}

type FieldProps = { name: string }

export function Field({ name, children }: PropsWithChildren<FieldProps>) {
  return (
    <BuiField.Root name={name} className="flex flex-col gap-2">
      {children}
    </BuiField.Root>
  )
}

type FieldLabelProps = Record<"children", string>

export function FieldLabel({ children }: FieldLabelProps) {
  return (
    <BuiField.Label className="justify-start flex items-center">
      <span className="font-sora text-sm font-medium capitalize text-neutral-600">
        {children}
      </span>
    </BuiField.Label>
  )
}

type FieldDescriptionProps = Record<"children", string>

export function FieldDescription({ children }: FieldDescriptionProps) {
  return (
    <BuiField.Description className="text-neutral-400 text-xs font-sora font-light pb-2">
      {children}
    </BuiField.Description>
  )
}

type FieldErrorProps = Record<"children", string>

export function FieldError({ children }: FieldErrorProps) {
  return (
    <BuiField.Error match={true}>
      <Pill size="sm" color="red">
        {children}
      </Pill>
    </BuiField.Error>
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
    <Toggle
      pressed={visible}
      onPressedChange={onVisibleChange}
      render={(props, state) => {
        return (
          <button {...props} className="cursor-pointer">
            {state.pressed ? (
              <Icon color="neutral" icon={IconEye} size="md" />
            ) : (
              <Icon color="neutral" icon={IconEyeOff} size="md" />
            )}
          </button>
        )
      }}
    />
  )
}

export { Input as FieldInput } from "./input"
export { Form } from "@base-ui-components/react/form"
