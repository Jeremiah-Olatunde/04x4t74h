import type { ApiError } from "@/lib/errors/api"
import { ButtonBadge } from "@/components/button"

type HttpProps = {
  error: ApiError
  children: string
  handleRetry: () => void
}

export function Http({ error, children, handleRetry }: HttpProps) {
  return (
    <section className="h-screen flex flex-col gap-4 px-6 py-8 justify-center">
      <header className="flex flex-col">
        <p className="">
          <span className="font-sora text-4xl text-neutral-200 font-semibold">
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

      <p className="font-sora text-neutral-600">{children}</p>

      <div className="flex gap-2 justify-start">
        <div>
          <ButtonBadge color="neutral" size="md">
            Report Error
          </ButtonBadge>
        </div>

        <div>
          <ButtonBadge color="white" size="md" onClick={handleRetry}>
            Try Again
          </ButtonBadge>
        </div>
      </div>
    </section>
  )
}
