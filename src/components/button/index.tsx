import type { PropsWithChildren } from "react"
import { Badge, type BadgeVariantProps } from "../badge"

type ButtonBadgeProps = {
  type: "submit" | "button"
  handleClick: () => void
}

export function ButtonBadge({
  children,
  color,
  shape,
  shade,
  size,
  type,
  handleClick,
}: PropsWithChildren<ButtonBadgeProps & BadgeVariantProps>) {
  return (
    <button type={type} onClick={handleClick} className="w-full cursor-pointer">
      <Badge color={color} shade={shade} shape={shape} size={size}>
        {children}
      </Badge>
    </button>
  )
}
