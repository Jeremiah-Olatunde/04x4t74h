export * from "./field.tsx"

export function FormHeader({
  textMain,
  textSub,
}: {
  textMain: string
  textSub: string
}) {
  return (
    <header className="flex flex-col items-center gap-1">
      <h1>
        <span className="font-sora text-xl font-bold text-neutral-700">
          {textMain}
        </span>
      </h1>

      <h2>
        <span className="font-sora text-sm text-neutral-400">{textSub}</span>
      </h2>
    </header>
  )
}

export function Form({ children }: { children: React.ReactNode }) {
  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()
      }}
    >
      {children}
    </form>
  )
}

export function FormSubmit({ text }: { text: string }) {
  return (
    <button
      type="submit"
      className="bg-primary font-sora cursor-pointer rounded-xl p-4 text-sm font-medium text-white capitalize"
    >
      {text}
    </button>
  )
}
