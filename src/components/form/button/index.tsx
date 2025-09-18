import { ButtonBadge } from "@/components/button"
import { Icon } from "@/components/icon"
import {
  CheckCheckIcon,
  EyeIcon,
  EyeOffIcon,
  LoaderCircleIcon,
} from "lucide-react"

type FieldPasswordToggleProps = {
  visible: boolean
  onVisibleChange: (pressed: boolean) => void
}

export function TogglePassword({
  visible: visible,
  onVisibleChange,
}: FieldPasswordToggleProps) {
  return (
    <button
      onClick={() => onVisibleChange(!visible)}
      type="button"
      className="cursor-pointer"
    >
      {visible ? (
        <Icon color="neutral" icon={EyeIcon} size="md" />
      ) : (
        <Icon color="neutral" icon={EyeOffIcon} size="md" />
      )}
    </button>
  )
}

export function Login() {
  return (
    <ButtonBadge type="submit" color="purple" size="lg">
      Sign Up
    </ButtonBadge>
  )
}
export function ShareYourExperience() {
  return (
    <ButtonBadge type="submit" color="purple" size="lg">
      Share your experience!
    </ButtonBadge>
  )
}

export function SignUp() {
  return (
    <ButtonBadge type="submit" color="purple" size="lg">
      Sign Up
    </ButtonBadge>
  )
}

export function TryAgain() {
  return (
    <ButtonBadge type="submit" color="purple" size="lg">
      TryAgain
    </ButtonBadge>
  )
}

export function Pending() {
  return (
    <ButtonBadge type="button" color="purple" size="lg">
      <LoaderCircleIcon className="animate-spin size-5" />
    </ButtonBadge>
  )
}
export function Success() {
  return (
    <ButtonBadge type="button" color="purple" size="lg">
      <CheckCheckIcon className="size-5" />
    </ButtonBadge>
  )
}
