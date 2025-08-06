import { Logo } from "@/components/logo"

export function Command() {
  return (
    <section className="flex flex-col gap-4 p-6">
      <div className="flex">
        <Logo />
      </div>
      <div className="h-2" />
      <header className="flex flex-col gap-2">
        <h1 className="font-fredoka text-4xl font-medium text-primary">
          Quick Navigation
        </h1>
        <div className="flex">
          <h2 className="rounded-md bg-secondary p-1 font-sora text-sm font-semibold text-white">
            command center
          </h2>
        </div>
      </header>
      <p className="font-sora text-stone-600">
        Convienently jump between pages
      </p>

      <ul className="flex flex-col gap-2">
        <li>
          <a href="/home">Home</a>
        </li>
        <li>
          <a href="/auth/login">Login</a>
        </li>
        <li>
          <a href="/auth/sign-up">Sign Up</a>
        </li>
        <li>
          <a href="/auth/password/forgot">Password Forgot</a>
        </li>
        <li>
          <a href="/auth/password/reset">Password Reset </a>
        </li>
      </ul>
    </section>
  )
}
