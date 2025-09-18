import { Pill } from "@/components/pill"
import type { ComponentProps, PropsWithChildren } from "react"

type RootProps = {} & ComponentProps<"div">

export function Root({
  children,
  className,
  ...props
}: PropsWithChildren<RootProps>) {
  return (
    <div {...props} className={`flex flex-col gap-2 ${className}`}>
      {children}
    </div>
  )
}

type LabelProps = {} & ComponentProps<"label">

export function Label({ children, htmlFor, ...props }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="justify-start flex items-center"
      {...props}
    >
      <span className="font-sora text-sm font-medium capitalize text-neutral-600">
        {children}
      </span>
    </label>
  )
}

type DescriptionProps = Record<"children", string>

export function Description({ children }: DescriptionProps) {
  return (
    <p>
      <span className="text-neutral-400 text-xs font-sora font-light pb-2">
        {children}
      </span>
    </p>
  )
}

type ErrorProps = {}

export function Error({ children }: PropsWithChildren<ErrorProps>) {
  return (
    <Pill size="sm" color="red">
      {children}
    </Pill>
  )
}

export function Errors({ errors }: { errors: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {errors.map((error) => (
        <div key={error} className="snap-start">
          <Error>{error}</Error>
        </div>
      ))}
    </div>
  )
}
