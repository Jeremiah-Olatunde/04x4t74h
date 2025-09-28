import { type PropsWithChildren } from "react"

import { Field } from "@base-ui-components/react/field"
import { Fieldset } from "@base-ui-components/react/fieldset"
import { Checkbox } from "@base-ui-components/react/checkbox"
import { CheckboxGroup } from "@base-ui-components/react/checkbox-group"

export * as Header from "./header"
export * as Skeleton from "./skeleton"

type RootProps = {
  name: string
  subfield?: boolean
}
export function Root({
  children,
  name,
  subfield,
}: PropsWithChildren<RootProps>) {
  return (
    <Field.Root
      name={name}
      className={subfield ? `p-4 bg-neutral-50/25 rounded-2xl` : ""}
    >
      <Fieldset.Root className="flex flex-col gap-4">{children}</Fieldset.Root>
    </Field.Root>
  )
}

type GroupProps = {
  value: readonly string[]
  onValueChange: (value: readonly string[]) => void
}

export function Group({
  children,
  value,
  onValueChange,
}: PropsWithChildren<GroupProps>) {
  return (
    <CheckboxGroup
      className="flex flex-row flex-wrap gap-2"
      value={value as string[]}
      onValueChange={onValueChange}
    >
      {children}
    </CheckboxGroup>
  )
}

type OptionProps = { value: string }
export function Option({ value }: OptionProps) {
  return (
    <Field.Label>
      <Checkbox.Root
        value={value}
        className="
          border-1 border-neutral-100 bg-neutral-50 px-3 py-2 rounded-xl font-sora font-medium text-xs text-neutral-400 capitalize
          data-checked:bg-primary/5 data-checked:border-primary data-checked:text-primary 
        "
      >
        {value}
      </Checkbox.Root>
    </Field.Label>
  )
}
