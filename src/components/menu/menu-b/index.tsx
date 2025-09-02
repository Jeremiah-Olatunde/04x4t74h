import { Dialog } from "@base-ui-components/react"
import {
  MapPinIcon,
  MapPinnedIcon,
  PhoneIcon,
  SearchIcon,
  UserRoundIcon,
  XIcon,
} from "lucide-react"

type MenuProps = {}

export function Menu({}: MenuProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="">
        <div className="fixed bottom-0 right-0 z-10 p-4">
          <div className="bg-white p-2 rounded-sm border-1 border-neutral-400 flex gap-1 justify-center items-center">
            <span className="font-sora text-neutral-400 text-xs uppercase tracking-widest font-bold">
              Menu
            </span>
          </div>
        </div>
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

              <div className="flex justify-center items-center grow">
                <ul className="flex flex-col gap-8">
                  <li className="flex justify-start items-center gap-4">
                    <MapPinnedIcon className="text-primary/75 size-8" />
                    <div className="font-sora text-2xl font-medium text-primary/75">
                      Discover
                    </div>
                  </li>

                  <li className="flex justify-start items-start gap-4">
                    <SearchIcon className="text-neutral-300 size-8" />
                    <span className="font-sora text-2xl font-medium text-neutral-300">
                      Search
                    </span>
                  </li>

                  <li className="flex justify-start items-start gap-4">
                    <UserRoundIcon className="text-neutral-300 size-8" />
                    <span className="font-sora text-2xl font-medium text-neutral-300">
                      Account
                    </span>
                  </li>
                </ul>
              </div>
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
