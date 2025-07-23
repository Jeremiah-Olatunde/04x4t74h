import { useState } from "react"
import { Eye as IconEye, EyeOff as IconEyeOff } from "lucide-react"

import * as Boolean from "@/lib/fp-ts/Boolean.ts"

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
    <label htmlFor={htmlFor}>
      <span className="font-sora text-xs font-medium capitalize">{text}</span>
    </label>
  )
}

export function FieldInput({
  name,
  type,
  placeholder,
  children,
}: {
  name: string
  type: "text" | "email" | "password"
  placeholder: string
  children?: React.ReactNode
}) {
  return (
    <div className="relative">
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="font-sora focus:outline-primary w-full rounded-xl border-1 border-neutral-200 bg-neutral-50 p-4 text-xs text-neutral-600 outline-2 outline-transparent transition placeholder:text-neutral-400 focus:border-neutral-400 focus:shadow-md/10"
      />
      {children ? (
        <div className="absolute top-0 right-0 cursor-pointer p-4">
          {children}
        </div>
      ) : null}
    </div>
  )
}

export function FieldInputPassword({
  name,
  placeholder,
}: {
  name: string
  placeholder: string
}) {
  const [visible, setVisible] = useState(false)

  return (
    <FieldInput
      name={name}
      placeholder={placeholder}
      type={visible ? "text" : "password"}
    >
      <button
        type="button"
        onClick={() => setVisible(Boolean.invert)}
        className="absolute top-0 right-0 cursor-pointer p-4"
      >
        {visible ? (
          <IconEye className="size-5 text-neutral-400" />
        ) : (
          <IconEyeOff className="size-5 text-neutral-400" />
        )}
      </button>
    </FieldInput>
  )
}
