import { Link as LinkWouter, useLocation } from "wouter"
import { Dialog } from "@base-ui-components/react"
import {
  ChartNoAxesGanttIcon,
  MapPinIcon,
  MapPinnedIcon,
  PhoneIcon,
  SearchIcon,
  UserRoundIcon,
  XIcon,
  type LucideIcon,
} from "lucide-react"

type MenuProps = {}
export function Menu({}: MenuProps) {
  const [wouterLocation] = useLocation()

  return (
    <Dialog.Root>
      <Dialog.Trigger className="flex gap-1 justify-center items-center">
        <ChartNoAxesGanttIcon className="text-neutral-400 size-6" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Popup className="">
          <div className="fixed inset-0 bg-white z-10 px-8 py-8">
            <div className="flex flex-col h-full">
              <div className="flex flex-row justify-between items-center">
                <span className="font-sora text-lg font-bold text-neutral-600">
                  Menu
                </span>
                <Dialog.Close>
                  <XIcon className="size-6 text-neutral-600" />
                </Dialog.Close>
              </div>

              <nav className="flex justify-center items-center grow">
                <ul className="flex flex-col gap-8">
                  <li className="">
                    <LinkWouter href="/home">
                      <Item
                        text="Discover"
                        active={wouterLocation.startsWith("/home")}
                        icon={MapPinnedIcon}
                      />
                    </LinkWouter>
                  </li>

                  <li className="">
                    <LinkWouter href="/search">
                      <Item
                        text="Search"
                        active={wouterLocation.startsWith("/search")}
                        icon={SearchIcon}
                      />
                    </LinkWouter>
                  </li>

                  <li className="">
                    <LinkWouter href="/auth/login">
                      <Item
                        text="Account"
                        active={wouterLocation.startsWith("/auth")}
                        icon={UserRoundIcon}
                      />
                    </LinkWouter>
                  </li>
                </ul>
              </nav>

              <div className="flex flex-col justify-center items-center gap-1 font-sora text-sm font-medium text-neutral-400">
                <div className="flex justify-center items-center gap-1">
                  <PhoneIcon className="text-neutral-400 size-4" />
                  <span className="">+234 817 891 7635</span>
                </div>
                <div className="flex justify-center items-center gap-1">
                  <MapPinIcon className="text-neutral-400 size-4" />
                  <span>10 Chimamanda Azikwe Street, Lagos Nigeria.</span>
                </div>
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
}

function Item({ active, icon: Icon, text }: ItemProps) {
  return (
    <div
      className={`
        flex justify-start items-center gap-4
          ${active ? "text-primary/75" : "text-neutral-300"}
      `}
    >
      <Icon className="size-8" />
      <div className="font-sora text-2xl font-medium">{text}</div>
    </div>
  )
}
