export function Unexpected() {
  return (
    <section className="h-screen flex flex-col gap-4 px-6 py-8 justify-center">
      <header className="flex flex-col">
        <h1 className="font-sora text-xl text-neutral-600 font-medium">
          Something's wrong
        </h1>
        <p className="text-neutral-400 text-sm font-medium font-sora">
          An unexpected error occured
        </p>
      </header>

      <p className="font-sora text-neutral-600">
        Oops, looks like something unexpected went wrong. Don’t worry—it happens
        sometimes. A quick refresh of the page might just fix it.
      </p>
    </section>
  )
}
