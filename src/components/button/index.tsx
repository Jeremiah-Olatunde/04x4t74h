import type { ComponentProps, PropsWithChildren } from "react"

import { Badge, type BadgeVariantProps } from "@/components/badge"
import { Pill } from "@/components/pill"

type ButtonBadgeProps = ComponentProps<"button"> & BadgeVariantProps

export function ButtonBadge({
  children,
  color,
  size,
  type,
  onClick,
}: PropsWithChildren<ButtonBadgeProps>) {
  return (
    <button type={type} onClick={onClick} className="w-full cursor-pointer">
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
  onClick,
}: PropsWithChildren<ButtonBadgeProps>) {
  return (
    <button type={type} onClick={onClick} className="w-full cursor-pointer">
      <Pill color={color} size={size}>
        {children}
      </Pill>
    </button>
  )
}
