import type { ComponentPropsWithoutRef } from "react"
import { Link as LinkWouter } from "wouter"

import * as _Badge from "@/components/badge"
import * as _Pill from "@/components/pill"

interface ClickableButtonProps extends ComponentPropsWithoutRef<"button"> {
  as: "button"
}

interface ClickableLinkProps extends ComponentPropsWithoutRef<"a"> {
  as: "link"
}

type ClickableProps = ClickableButtonProps | ClickableLinkProps

export function Clickable(props: ClickableProps) {
  if (props.as === "button") {
    return <button {...props}>{props.children}</button>
  }
  return <LinkWouter {...props} href={props.href ?? "#"}></LinkWouter>
}

type BadgeProps = ClickableProps & _Badge.BadgeVariantProps

export function Badge(props: BadgeProps) {
  return (
    <Clickable {...props}>
      <_Badge.Badge {...props}>{props.children}</_Badge.Badge>
    </Clickable>
  )
}

type PillProps = ClickableProps & _Pill.PillVariantProps
export function Pill(props: PillProps) {
  return (
    <Clickable {...props}>
      <_Pill.Pill {...props}>{props.children}</_Pill.Pill>
    </Clickable>
  )
}
