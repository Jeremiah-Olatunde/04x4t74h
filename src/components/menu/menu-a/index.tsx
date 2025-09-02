import { Dialog } from "@base-ui-components/react"
import {
  MapPinnedIcon,
  MenuIcon,
  SearchIcon,
  UserRoundIcon,
  XIcon,
  type LucideIcon,
} from "lucide-react"
import { Link as LinkWouter, useLocation } from "wouter"

type MenuProps = {}
export function Menu({}: MenuProps) {
  const [wouterLocation] = useLocation()

  return (
    <Dialog.Root>
      <Dialog.Trigger className="">
        <div className="fixed bottom-0 right-0 z-10 p-4">
          <div className="bg-white p-4 rounded-full border-1 border-neutral-400 flex justify-center">
            <MenuIcon className="text-neutral-400 size-6" />
          </div>
        </div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-gradient-to-b from-black/20 to-black/75 backdrop-blur-xs z-10" />
        <Dialog.Popup className="">
          <nav className="fixed bottom-0 right-0 z-10 p-4 flex flex-col justify-center items-end gap-1">
            <ul className="flex flex-col justify-center items-end gap-1">
              <li>
                <LinkWouter href="/home">
                  <Item
                    active={wouterLocation === "/home"}
                    icon={MapPinnedIcon}
                    text="Discover"
                  />
                </LinkWouter>
              </li>

              <li>
                <LinkWouter href="/search">
                  <Item
                    active={wouterLocation === "/search"}
                    icon={SearchIcon}
                    text="Search"
                  />
                </LinkWouter>
              </li>

              <li>
                <LinkWouter href="/auth/login">
                  <Item
                    active={wouterLocation === "/auth/login"}
                    icon={UserRoundIcon}
                    text="Account"
                  />
                </LinkWouter>
              </li>
            </ul>
            <Dialog.Close>
              <Item active={false} icon={XIcon} text="Menu" />
            </Dialog.Close>
          </nav>
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
    <div className="flex flex-row justify-center items-center gap-2">
      <span
        className={`
          font-sora font-bold
          ${active ? "text-xl text-white" : "text-lg text-white/60"}
        `}
      >
        {text}
      </span>
      <div
        className={`
          bg-white p-4 rounded-full border-2 flex justify-center
          ${active ? "border-primary" : "border-neutral-400"}
        `}
      >
        <Icon
          className={`
          size-6
          ${active ? "text-primary" : "text-neutral-400"}
        `}
        />
      </div>
    </div>
  )
}
