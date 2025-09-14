import { Link as LinkWouter, useLocation } from "wouter"
import { Dialog } from "@base-ui-components/react"
import {
  ArrowUpRightIcon,
  ChartNoAxesGanttIcon,
  MapPinIcon,
  MapPinnedIcon,
  PhoneIcon,
  PlusIcon,
  SearchIcon,
  TelescopeIcon,
  UserRoundIcon,
  XIcon,
  type LucideIcon,
} from "lucide-react"
import { LinkBadge } from "@/components/link"
import { Logo } from "@/components/logo"
import { useState, type PropsWithChildren } from "react"

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
          <div className="fixed inset-0 bg-white z-10 px-8 py-8">
            <div className="flex flex-col h-full gap-16">
              <div className="flex flex-row justify-between items-center">
                <span className="font-sora text-lg font-bold text-neutral-600">
                  Menu
                </span>
                <Dialog.Close>
                  <XIcon className="size-6 text-neutral-600" />
                </Dialog.Close>
              </div>

              <Navigation>
                <NavigationItem
                  active={wouterLocation.startsWith("/discover")}
                  icon={TelescopeIcon}
                  text="Discover"
                  href="/discover"
                >
                  <SubItem
                    active={wouterLocation.startsWith(
                      "/discover/recommendations",
                    )}
                    text="Recommendations"
                    href="/discover/recommendations"
                  />
                </NavigationItem>

                <NavigationItem
                  active={wouterLocation.startsWith("/explore")}
                  icon={MapPinnedIcon}
                  text="Explore"
                  href="/explore"
                >
                  <SubItem
                    active={wouterLocation.startsWith("/explore/tags")}
                    text="Tags"
                    href="/explore/tags"
                  />

                  <SubItem
                    active={wouterLocation.startsWith("/explore/cities")}
                    text="Cities"
                    href="/explore/cities"
                  />

                  <SubItem
                    active={wouterLocation.startsWith("/explore/categories")}
                    text="Categories"
                    href="/explore/categories"
                  />

                  <SubItem
                    active={wouterLocation.startsWith("/explore/businesses")}
                    text="Businesses"
                    href="/explore/businesses"
                  />
                </NavigationItem>

                <NavigationItem
                  active={wouterLocation.startsWith("/search")}
                  icon={SearchIcon}
                  text="Search"
                  href="/search"
                />

                <NavigationItem
                  active={false}
                  icon={UserRoundIcon}
                  text="Account"
                  href="/auth/login"
                />
              </Navigation>

              <LinkBadge href="/auth/login" size="lg" color="purple">
                Get Started
              </LinkBadge>

              <div className="flex flex-col justify-center items-center gap-1 font-sora text-sm font-medium text-neutral-400">
                <div className="flex justify-center items-center gap-1">
                  <PhoneIcon className="text-neutral-400 size-4" />
                  <span className="">+234 817 891 7635</span>
                </div>
                <div className="flex justify-center items-center gap-1">
                  <MapPinIcon className="text-neutral-400 size-4" />
                  <span>10 Chimamanda Azikwe Street, Lagos Nigeria.</span>
                </div>

                <div />
                <div />

                <Logo />
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

function NavigationItem({
  active,
  icon: Icon,
  text,
  href,
  children,
}: PropsWithChildren<ItemProps>) {
  const [expanded, setExpanded] = useState(false)

  return (
    <li>
      <div className="flex flex-row justify-between">
        <LinkWouter href={href} className="w-full">
          <div
            className={`
              grow
        flex gap-4 justify-start items-center 
        ${active ? "text-neutral-500" : "text-neutral-300"}
      `}
          >
            <Icon className="size-6" />
            <span className="font-sora font-semibold text-2xl">{text}</span>
          </div>
        </LinkWouter>

        {children && (
          <button type="button" onClick={() => setExpanded(!expanded)}>
            <PlusIcon
              className={`size-6 ${active ? "text-neutral-500" : "text-neutral-300"}`}
            />
          </button>
        )}
      </div>
      <div className="h-4" />
      {children && expanded && (
        <ul className="flex flex-col gap-4 px-10">{children}</ul>
      )}
    </li>
  )
}

type SubItemProps = { active: boolean; text: string; href: string }
function SubItem({ active, text, href }: SubItemProps) {
  return (
    <LinkWouter href={href}>
      <div
        className={`flex justify-between items-center ${active ? "text-primary/80" : "text-neutral-300"}`}
      >
        <span className="font-sora font-semibold text-sm">{text}</span>
        <ArrowUpRightIcon className="tsize-4" />
      </div>
    </LinkWouter>
  )
}

function Navigation({ children }: PropsWithChildren<{}>) {
  return (
    <nav className="grow">
      <ul className="flex flex-col gap-8">{children}</ul>
    </nav>
  )
}
