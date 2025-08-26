import {
  BadRequest,
  ImATeapot,
  InternalServerError,
  TooManyRequests,
  Unauthorized,
} from "@/api/errors"
import { sleep } from "@/utils"

type LoginKeys = "email" | "password"
type LoginDetails = Record<LoginKeys, string>
type LoginPayload = { token: string }

export async function login({}: LoginDetails): Promise<LoginPayload> {
  await sleep(Math.random() * 1500)

  if (Math.random() < 0.3) {
    throw new Unauthorized("Invalid credentials")
  }

  if (Math.random() < 0.3) {
    const field = "email"
    const message = `Invalid ${field}`
    const details = { field, tag: "invalid" } as const
    throw new BadRequest(message, details)
  }

  if (Math.random() < 0.1) {
    throw new ImATeapot("Don't share your password with a teapot!")
  }

  if (Math.random() < 0.1) {
    throw new InternalServerError(
      "An unexpected error occurred while processing your request",
    )
  }

  if (Math.random() < 0.1) {
    const time = Math.ceil(Math.random() * 120)
    throw new TooManyRequests(`Try again after ${time} seconds`)
  }

  return { token: crypto.randomUUID() }
}
