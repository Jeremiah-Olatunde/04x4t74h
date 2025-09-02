import { ChevronLeftIcon } from "lucide-react"
import { LogoText } from "@/components/logo"
import { Menu } from "@/components/menu"

type TopbarProps = {}
export function Topbar({}: TopbarProps) {
  return (
    <div>
      <section className="w-full p-6 grid grid-cols-3">
        <button
          type="button"
          className="flex gap-1 items-center"
          onClick={() => history.back()}
        >
          <ChevronLeftIcon className="text-neutral-400 size-6" />
        </button>
        <div className="place-self-center">
          <LogoText />
        </div>
        <div className="place-self-end">
          <Menu />
        </div>
      </section>
    </div>
  )
}
