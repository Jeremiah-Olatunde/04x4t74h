import type { ComponentProps, PropsWithChildren } from "react"
import { HeartIcon, Share2Icon } from "lucide-react"

import { Badge, type BadgeVariantProps } from "@/components/badge"
import { Pill, type PillVariantProps } from "@/components/pill"

type ButtonBadgeProps = ComponentProps<"button"> & BadgeVariantProps

export function ButtonBadge({
  children,
  color,
  size,
  type,
  className,
  ...props
}: PropsWithChildren<ButtonBadgeProps>) {
  return (
    <button
      type={type}
      className={`w-full cursor-pointer ${className}`}
      {...props}
    >
      <Badge color={color} size={size}>
        {children}
      </Badge>
    </button>
  )
}

type ButtonPillProps = ComponentProps<"button"> & PillVariantProps

export function ButtonPill({
  children,
  color,
  size,
  type,
  className,
  onClick,
}: PropsWithChildren<ButtonPillProps>) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-min cursor-pointer ${className}`}
    >
      <Pill color={color} size={size}>
        {children}
      </Pill>
    </button>
  )
}

type ButtonLikeProps = { active: boolean } & ComponentProps<"button">

export function ButtonLike({
  active,
  ...props
}: PropsWithChildren<ButtonLikeProps>) {
  return (
    <button type="button" className="rounded-full bg-[#FF6B6B] p-2" {...props}>
      <HeartIcon
        className={`size-4 ${active ? "fill-white" : "fill-none"} stroke-white`}
      />
    </button>
  )
}

type ButtonShareProps = {} & ComponentProps<"button">

export function ButtonShare({ ...props }: PropsWithChildren<ButtonShareProps>) {
  return (
    <button type="button" className="rounded-full bg-[#FF6B6B] p-2" {...props}>
      <Share2Icon className="size-4 fill-none stroke-white" />
    </button>
  )
}
