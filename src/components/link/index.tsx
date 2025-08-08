import type { PropsWithChildren } from "react"
import { Link as LinkWouter } from "wouter"

import { Badge, type BadgeVariantsProps } from "../badge"

type LinkTextProps = Record<"children" | "href", string>

export function LinkText({ children, href }: LinkTextProps) {
  return (
    <LinkWouter href={href}>
      <span className="block text-primary font-sora text-xs font-bold underline">
        {children}
      </span>
    </LinkWouter>
  )
}

type LinkBadgeProps = Record<"href", string>

export function LinkBadge({
  children,
  color,
  href,
  shade,
  shape,
  size,
}: PropsWithChildren<LinkBadgeProps & BadgeVariantsProps>) {
  return (
    <LinkWouter href={href} className="cursor-pointer">
      <Badge color={color} shape={shape} shade={shade} size={size}>
        {children}
      </Badge>
    </LinkWouter>
  )
}
