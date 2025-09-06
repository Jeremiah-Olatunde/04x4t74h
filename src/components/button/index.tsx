import {
  useEffect,
  useState,
  type ComponentProps,
  type PropsWithChildren,
} from "react"

import { Badge, type BadgeVariantProps } from "@/components/badge"
import { Pill, type PillVariantProps } from "@/components/pill"
import {
  ArrowUpAZIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  HeartIcon,
  ListFilterIcon,
  Share2Icon,
} from "lucide-react"

type ButtonBadgeProps = ComponentProps<"button"> & BadgeVariantProps

export function ButtonBadge({
  children,
  color,
  size,
  type,
  className,
  onClick,
}: PropsWithChildren<ButtonBadgeProps>) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full cursor-pointer ${className}`}
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

type ButtonBackProps = {}

export function ButtonBack({ children }: PropsWithChildren<ButtonBackProps>) {
  return (
    <button type="button" className="w-min" onClick={() => history.back()}>
      {children}
    </button>
  )
}

export function ButtonScrollTop() {
  const [top, setTop] = useState(true)

  useEffect(() => {
    const handler = () => setTop(window.scrollY === 0)
    handler()

    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  if (top) {
    return <></>
  }

  return (
    <div className="fixed bottom-0 right-0 p-4 z-10">
      <button
        type="button"
        className="p-2 rounded-full bg-primary  flex place-items-center"
        onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUpIcon className="text-white size-6" />
      </button>
    </div>
  )
}

type ButtonFilterProps = {} & ComponentProps<"button">
export function ButtonFilter({}: ButtonFilterProps) {
  return (
    <ButtonBadge size="sm" color="purple">
      <div className="flex gap-1 items-center justify-center">
        Filter
        <ListFilterIcon className="size-3" />
      </div>
    </ButtonBadge>
  )
}

type ButtonSortProps = {} & ComponentProps<"button">
export function ButtonSort({}: ButtonSortProps) {
  return (
    <ButtonBadge size="sm" color="white">
      <div className="flex gap-1 items-center justify-center">
        Sort
        <ArrowUpAZIcon className="size-3" />
      </div>
    </ButtonBadge>
  )
}
