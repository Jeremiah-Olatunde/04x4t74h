import { tw } from "@/utils/tailwind"
import { cva, type VariantProps } from "class-variance-authority"
import type { PropsWithChildren } from "react"

const base = tw`flex flex-col gap-1 border-1 p-4 rounded-xl`
const red = tw`bg-red-50 border-red-600 text-red-600`
const green = tw`bg-green-50 border-green-600 text-green-600`
const purple = tw`bg-primary/10 border-primary text-primary`

const variants = {
  color: { red, purple, green },
}

const generateClasses = cva(base, { variants })

type Variants = VariantProps<typeof generateClasses>

type RootProps = {
  color: NonNullable<Variants["color"]>
}

export function Root({ children, color }: PropsWithChildren<RootProps>) {
  return <div className={generateClasses({ color })}>{children}</div>
}

export function Title({ children }: { children: string }) {
  return <p className="font-sora font-medium text-sm ">{children}</p>
}

export function Content({ children }: { children: string }) {
  return <p className="font-sora font-light text-xs">{children}</p>
}
