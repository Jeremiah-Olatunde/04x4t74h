import { Eye as IconEye, EyeOff as IconEyeOff } from "lucide-react"

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
    <div className="has-focus:outline-primary flex justify-center gap-2 rounded-xl border-1 border-neutral-200 bg-neutral-50 p-4 outline-2 outline-transparent transition has-focus:border-neutral-400 has-focus:shadow-md/10">
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="font-sora grow border-none text-xs text-neutral-600 outline-none placeholder:text-neutral-400"
      />
      {children ? (
        <div className="flex cursor-pointer items-center justify-center">
          {children}
        </div>
      ) : null}
    </div>
  )
}

export function FieldInput_({
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
        <div className="absolute right-0 bottom-1/2 flex translate-y-1/2 cursor-pointer items-center justify-center pr-4">
          {children}
        </div>
      ) : null}
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
        <IconEye className="size-5 text-neutral-400" />
      ) : (
        <IconEyeOff className="size-5 text-neutral-400" />
      )}
    </button>
  )
}
