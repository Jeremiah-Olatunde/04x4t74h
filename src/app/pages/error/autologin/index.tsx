import type { ApiError } from "@/api/errors"
import { ButtonBadge } from "@/components/button"
import { LinkBadge } from "@/components/link"

type AutoLoginProps = {
  error: ApiError
}

export function AutoLogin({ error }: AutoLoginProps) {
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

      <p className="font-sora text-neutral-600">
        Your account was created, but something went wrong while logging you in
        automatically. Please click the button below to go to the login page and
        sign in manually
      </p>

      <div className="flex gap-2 justify-start">
        <div>
          <ButtonBadge color="neutral" size="md">
            Report Error
          </ButtonBadge>
        </div>

        <div>
          <LinkBadge href="~/auth/login" color="white" size="md">
            Manual Login
          </LinkBadge>
        </div>
      </div>
    </section>
  )
}
