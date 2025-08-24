import {
  ChevronDownIcon,
  LogInIcon,
  MenuIcon,
  SearchIcon,
  TelescopeIcon,
} from "lucide-react"

import { Icon } from "@/components/icon"
import { Logo } from "@/components/logo"
import { LinkBadge } from "@/components/link"
import { Select } from "@base-ui-components/react/select"
import { useState } from "react"
import { Dialog } from "@base-ui-components/react/dialog"
import { Link as WouterLink } from "wouter"

export function Hero() {
  const [city, setCity] = useState("Lagos")
  const [cities] = useState(["Abuja", "Lagos", "Port Harcourt"])

  return (
    <header className="relative rounded-b-2xl bg-[url(/images/bg-guest.png)] bg-cover p-6">
      <div className="flex justify-between items-center">
        <SelectCity city={city} cities={cities} handleCityChange={setCity} />
        <div className="opacity-0 border-1 border-neutral-300 bg-white rounded-lg p-0.5">
          <MenuIcon className="text-neutral-400 size-6" />
        </div>
      </div>

      <div className="fixed top-6 right-6 z-10">
        <Sidebar />
      </div>

      <div className="h-8" />

      <Logo color="white" size="sm" />

      <div className="h-4" />

      <h1 className="font-sora text-white font-bold text-2xl text-center">
        Best of the city, <br />
        Currated just for you.
      </h1>

      <div className="h-4" />

      <p className="font-sora text-white text-center text-xs">
        Enjoy instant, personalized recommendations for places to eat, chill,
        date, or explore—right in your city.
      </p>

      <div className="h-6" />

      <div className="flex justify-center items-center">
        <span className="text-xs text-white font-sora font-medium">
          Ready to find your Next Spot?
        </span>
      </div>

      <div className="h-2" />

      <div className="flex gap-2 items-center">
        <div className="basis-2/5">
          <LinkBadge color="yellow" href="/auth/sign-up" size="md">
            Get Started
          </LinkBadge>
        </div>

        <button
          type="button"
          className="bg-white cursor-pointer basis-3/5 p-2 gap-2 rounded-md flex items-center"
        >
          <Icon color="neutral" icon={SearchIcon} size="sm" />
          <span className="text-xxs text-neutral-400 font-sora">
            Search Plazzaa...
          </span>
        </button>
      </div>

      <div className="h-2" />
    </header>
  )
}

type SelectCityProps = {
  city: string
  cities: string[]
  handleCityChange: (city: string) => void
}

function SelectCity({ city, cities, handleCityChange }: SelectCityProps) {
  return (
    <Select.Root
      items={cities.map((c) => ({ label: c, value: c }))}
      name="poet"
      id="poet"
      value={city}
      onValueChange={handleCityChange}
    >
      <Select.Trigger>
        <div className="flex flex-row gap-2 justify-between items-center py-1 px-2 rounded-md bg-white/10 backdrop-blur-xs">
          <Select.Value className="font-sora text-xs font-medium text-white" />
          <Select.Icon>
            <ChevronDownIcon className="text-white size-4" />
          </Select.Icon>
        </div>
      </Select.Trigger>

      <Select.Portal>
        <Select.Positioner align="start" sideOffset={8}>
          <Select.Popup className="bg-white border-1 border-neutral-300 rounded-lg flex flex-col gap-0">
            {cities.map((city) => {
              return (
                <Select.Item key={city} value={city} className="p-2">
                  <Select.ItemText className="font-sora text-sm text-neutral-600">
                    {city}
                  </Select.ItemText>
                </Select.Item>
              )
            })}
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  )
}

type SidebarProps = {}

function Sidebar({}: SidebarProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="flex flex-row justify-center items-center gap-1 border-1 border-neutral-300 bg-white rounded-md p-1">
        <MenuIcon className="text-neutral-400 size-4" />
        <span className="font-sora text-xs font-semibold text-neutral-400">
          Menu
        </span>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-black/0 backdrop-blur-[2px] z-20" />
        <Dialog.Popup className="fixed top-0 right-0 p-1 h-screen z-20">
          <div className="bg-white border-1 border-neutral-300 h-full rounded-xl flex flex-col justify-between items-center px-6 py-6">
            <div>
              <ul className="flex flex-col gap-8 items-center">
                <li className="">
                  <MenuIcon className="text-neutral-400 size-6" />
                </li>

                <div className="h-0" />

                <li className="">
                  <TelescopeIcon className="text-neutral-400 size-6" />
                </li>
                <li className="">
                  <SearchIcon className="text-neutral-400 size-6" />
                </li>
              </ul>
            </div>

            <ul>
              <li>
                <WouterLink href="/auth/login">
                  <LogInIcon className="text-neutral-400 size-6" />
                </WouterLink>
              </li>
            </ul>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
