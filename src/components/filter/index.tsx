import { Dialog } from "@base-ui-components/react"
import { ListFilterIcon } from "lucide-react"

import { Badge } from "@/components/badge"

export function Filter() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="">
        <Badge size="sm" color="purple">
          <div className="flex gap-1 items-center justify-center">
            Filter
            <ListFilterIcon className="size-3" />
          </div>
        </Badge>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Popup className="">
          <div className="fixed inset-0 bg-white z-10 px-8 py-8"></div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
