import { useLocation, Link as WouterLink } from "wouter"
import { Dialog } from "@base-ui-components/react"
import {
  MenuIcon,
  MapPinnedIcon,
  SearchIcon,
  CircleUserRoundIcon,
} from "lucide-react"

type SidebarProps = {}

export function Sidebar({}: SidebarProps) {
  const [wouterLocation] = useLocation()

  return (
    <Dialog.Root>
      <Dialog.Trigger className="flex flex-row justify-center items-center gap-1 border-1 border-neutral-300 bg-white rounded-md p-1">
        <MenuIcon className="text-neutral-400 size-4" />
        <span className="font-sora text-xs font-semibold text-neutral-400">
          Menu
        </span>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-20" />
        <Dialog.Popup className="fixed top-0 right-0 h-screen z-20">
          <div className="bg-white border-1 border-neutral-300 h-full rounded-s-3xl flex flex-col justify-between items-center px-6 py-10">
            <div>
              <ul className="flex flex-col gap-8 items-center">
                <li className="">
                  <Dialog.Close>
                    <MenuIcon className="text-neutral-400 size-6" />
                  </Dialog.Close>
                </li>

                <div className="h-0" />

                <li className="">
                  <WouterLink href="/home">
                    <MapPinnedIcon
                      className={`${wouterLocation === "/home" ? "text-primary/80" : "text-neutral-400"} size-6`}
                    />
                  </WouterLink>
                </li>
                <li className="">
                  <WouterLink href="/search">
                    <SearchIcon
                      className={`${wouterLocation === "/search" ? "text-primary/80" : "text-neutral-400"} size-6`}
                    />
                  </WouterLink>
                </li>
              </ul>
            </div>

            <ul>
              <li>
                <WouterLink href="/auth/login">
                  <CircleUserRoundIcon className="text-neutral-400 size-8" />
                </WouterLink>
              </li>
            </ul>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
