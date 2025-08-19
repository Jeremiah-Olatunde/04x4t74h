import type { PropsWithChildren } from "react"
import { Badge, type BadgeVariantProps } from "@/components/badge"
import { Pill } from "@/components/pill"

type ButtonProps = {
  type: "submit" | "button"
  handleClick: () => void
}

type ButtonBadgeProps = ButtonProps & BadgeVariantProps

export function ButtonBadge({
  children,
  color,
  size,
  type,
  handleClick,
}: PropsWithChildren<ButtonBadgeProps>) {
  return (
    <button type={type} onClick={handleClick} className="w-full cursor-pointer">
      <Badge color={color} size={size}>
        {children}
      </Badge>
    </button>
  )
}

export function ButtonPill({
  children,
  color,
  size,
  type,
  handleClick,
}: PropsWithChildren<ButtonBadgeProps>) {
  return (
    <button type={type} onClick={handleClick} className="w-full cursor-pointer">
      <Pill color={color} size={size}>
        {children}
      </Pill>
    </button>
  )
}
