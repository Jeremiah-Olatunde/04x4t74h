import type { ApiError } from "@/api/errors"

export function Http({ error }: { error: ApiError }) {
  return (
    <section className="h-screen flex flex-col gap-4 px-6 py-8 justify-center">
      <header className="flex flex-col">
        <p className="">
          <span className="font-sora text-4xl text-primary font-semibold">
            {error.code}
          </span>
          &nbsp;
        </p>
        <h1 className="font-sora text-xl text-neutral-600 font-medium">
          {error.text}
        </h1>
        <p className="text-neutral-400 text-sm font-medium font-sora">
          {error.message}
        </p>
      </header>

      <p className="font-sora text-neutral-600">
        Oops, looks like something unexpected went wrong. Don’t worry—it happens
        sometimes. A quick refresh of the page might just fix it.
      </p>
    </section>
  )
}
