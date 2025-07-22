export function App() {
  return (
    <section className="p-6 flex flex-col gap-4">
      <header className="flex flex-col gap-2">
        <h1 className="font-fredoka text-4xl font-medium text-primary">
          The Second Coming
        </h1>
        <div className="flex">
          <h2 className="font-sora text-sm font-semibold text-white rounded-md bg-secondary p-1">
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
  );
}
