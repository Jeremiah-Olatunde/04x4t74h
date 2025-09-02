import { useLocation } from "wouter"
import { Dialog } from "@base-ui-components/react"
import {
  MenuIcon,
  MapPinnedIcon,
  SearchIcon,
  UserRoundIcon,
  ExpandIcon,
} from "lucide-react"

type MenuProps = {}

export function Menu({}: MenuProps) {
  // const [wouterLocation] = useLocation()

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
          <div className="fixed bottom-0 right-0 z-10 p-4 flex flex-col justify-center items-end gap-1">
            <div className="flex flex-row justify-center items-center gap-2">
              <span className="font-sora text-white font-bold text-xl">
                Discover
              </span>
              <div className="bg-white p-4 rounded-full border-1 border-primary flex justify-center">
                <MapPinnedIcon className="text-primary size-6" />
              </div>
            </div>
            <div className="flex flex-row justify-center items-center gap-2">
              <span className="font-sora text-white/50 font-bold text-lg">
                Search
              </span>
              <div className="bg-white p-4 rounded-full border-2 border-neutral-400 flex justify-center">
                <SearchIcon className="text-neutral-400 size-6" />
              </div>
            </div>
            <div className="flex flex-row justify-center items-center gap-2">
              <span className="font-sora text-white/50 font-bold text-lg">
                Account
              </span>
              <div className="bg-white p-4 rounded-full border-2 border-neutral-400 flex justify-center">
                <UserRoundIcon className="text-neutral-400 size-6" />
              </div>
            </div>
            <div className="flex flex-row justify-center items-center gap-2">
              <span className="font-sora text-white/50 font-bold text-lg">
                Expand
              </span>
              <div className="bg-white p-4 rounded-full border-2 border-neutral-400 flex justify-center">
                <ExpandIcon className="text-neutral-400 size-6" />
              </div>
            </div>

            {/* <div className="bg-white p-4 rounded-full border-1 border-neutral-300 flex justify-center items-stretch gap-3"> */}
            {/*   <div className="flex justify-center items-center gap-6"> */}
            {/*     <MapPinnedIcon className="text-primary/75 size-6" /> */}
            {/*     <SearchIcon className="text-neutral-300 size-6" /> */}
            {/*     <UserRoundIcon className="text-neutral-300 size-6" /> */}
            {/*   </div> */}
            {/*   <div className="w-px bg-neutral-200" /> */}
            {/*   <div> */}
            {/*     <MenuIcon className="text-neutral-400 size-6" /> */}
            {/*   </div> */}
            {/* </div> */}
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
