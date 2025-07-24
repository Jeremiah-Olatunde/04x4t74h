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
  type: "text" | "email" | "password" | "tel"
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
        className="font-sora w-0 grow border-none text-xs text-neutral-600 outline-none placeholder:text-neutral-400"
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
        <IconEye className="size-5 text-neutral-400" />
      ) : (
        <IconEyeOff className="size-5 text-neutral-400" />
      )}
    </button>
  )
}
