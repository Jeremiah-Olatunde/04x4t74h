import { LoaderCircleIcon } from "lucide-react"

export function LoadingScreen() {
  return (
    <section className="h-screen w-screen flex justify-center items-center">
      <LoaderCircleIcon className="text-primary size-16 animate-spin" />
    </section>
  )
}
