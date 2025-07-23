import { Logo } from "@/components/logo"

export function App() {
  return (
    <section className="flex flex-col gap-4 p-6">
      <div className="flex">
        <Logo />
      </div>
      <div className="h-2" />
      <header className="flex flex-col gap-2">
        <h1 className="font-fredoka text-primary text-4xl font-medium">
          The Second Coming
        </h1>
        <div className="flex">
          <h2 className="font-sora bg-secondary rounded-md p-1 text-sm font-semibold text-white">
            William Butler Yeats
          </h2>
        </div>
      </header>
      <p className="font-sora text-stone-600">
        Turning and turning in the widening gyre the falcon cannot hear the
        falconer things fall apart, the center cannot hold mere anarchy is
        loosed upon the land the blood dimmed tide is loosed and everywhere the
        ceremony of innocence is drown
      </p>
    </section>
  )
}
