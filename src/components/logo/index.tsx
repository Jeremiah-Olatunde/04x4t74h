import logoPrimary from "@/assets/icons/logo-primary.svg"

export function Logo() {
  return (
    <div className="w-min-content flex flex-row items-center justify-center">
      <img src={logoPrimary} className="size-8" />
      <span className="font-fredoka text-3xl font-semibold capitalize">
        plazzaa
      </span>
    </div>
  )
}
