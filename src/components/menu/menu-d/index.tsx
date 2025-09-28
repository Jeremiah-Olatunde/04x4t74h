import { Link as LinkWouter, useLocation } from "wouter"
import { Dialog } from "@base-ui-components/react"
import {
  ChartNoAxesGanttIcon,
  CompassIcon,
  LogInIcon,
  SearchIcon,
  XIcon,
  type LucideIcon,
} from "lucide-react"
import { type PropsWithChildren } from "react"

type MenuProps = { color: "neutral" | "white" }
export function Menu({ color }: MenuProps) {
  const [wouterLocation] = useLocation()

  return (
    <Dialog.Root>
      <Dialog.Trigger className="flex gap-1 justify-center items-center">
        <ChartNoAxesGanttIcon
          className={`size-6 ${color === "neutral" ? "text-neutral-400" : "text-white"}`}
        />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Popup className="">
          <div className="fixed inset-0 bg-neutral-800 z-10 py-10 px-8">
            <div className="flex flex-col h-full gap-24 pb-8">
              <div className="grid grid-cols-3">
                <span />
                <span className="font-sora text-lg font-medium text-neutral-200 justify-self-center">
                  Menu
                </span>
                <Dialog.Close className="justify-self-end">
                  <XIcon className="size-6 text-neutral-200" />
                </Dialog.Close>
              </div>

              <Navigation>
                <NavigationItem
                  active={wouterLocation.startsWith("/discover")}
                  icon={CompassIcon}
                  text="Discover"
                  href="/discover"
                />

                <NavigationItem
                  active={wouterLocation.startsWith("/search")}
                  icon={SearchIcon}
                  text="Search"
                  href="/search"
                />
              </Navigation>

              <div className="flex flex-row justify-between">
                <LinkWouter href="/auth/login" className="w-full">
                  <div className="grow flex gap-2 justify-center items-center text-neutral-500">
                    <LogInIcon className="size-5" />
                    <span className="font-sora font-medium text-sm">
                      Log In
                    </span>
                  </div>
                </LinkWouter>
              </div>
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

type ItemProps = {
  icon: LucideIcon
  text: string
  active: boolean
  href: string
}

export function NavigationItem({
  active,
  icon: Icon,
  text,
  href,
}: PropsWithChildren<ItemProps>) {
  return (
    <li>
      <div className="flex flex-row justify-between">
        <LinkWouter href={href} className="w-full">
          <div
            className={`
              grow
              flex gap-2 justify-center items-center 
              ${active ? "text-neutral-200" : "text-neutral-500"}
            `}
          >
            <Icon className="size-5" />
            <span className="font-sora font-medium text-lg">{text}</span>
          </div>
        </LinkWouter>
      </div>
    </li>
  )
}

function Navigation({ children }: PropsWithChildren<{}>) {
  return (
    <nav className="grow">
      <ul className="flex flex-col gap-8">{children}</ul>
    </nav>
  )
}
