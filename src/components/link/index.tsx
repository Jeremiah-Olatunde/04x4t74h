import type { PropsWithChildren } from "react"
import { Link as LinkWouter } from "wouter"
import { ChevronLeftIcon } from "lucide-react"

import { Badge, type BadgeVariantProps } from "../badge"
import { Pill, type PillVariantProps } from "@/components/pill"

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

type LinkBadgeProps = Record<"href", string> & BadgeVariantProps

export function LinkBadge({
  children,
  color,
  href,
  size,
}: PropsWithChildren<LinkBadgeProps>) {
  return (
    <LinkWouter href={href} className="cursor-pointer">
      <Badge color={color} size={size}>
        {children}
      </Badge>
    </LinkWouter>
  )
}

type LinkPillProps = Record<"href", string> & PillVariantProps

export function LinkPill({
  children,
  color,
  href,
  size,
}: PropsWithChildren<LinkPillProps>) {
  return (
    <LinkWouter href={href} className="cursor-pointer">
      <Pill color={color} size={size}>
        {children}
      </Pill>
    </LinkWouter>
  )
}

type LinkBackProps = { href: string }

export function LinkBack({ href }: LinkBackProps) {
  return (
    <LinkWouter href={href} className="w-min">
      <div className="w-min bg-white border-1 border-neutral-300 p-1 rounded-lg">
        <ChevronLeftIcon className="text-neutral-400 size-5" />
      </div>
    </LinkWouter>
  )
}
