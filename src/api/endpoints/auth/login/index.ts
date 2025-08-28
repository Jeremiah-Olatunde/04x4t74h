import {
  BadRequest,
  ImATeapot,
  InternalServerError,
  TooManyRequests,
  Unauthorized,
} from "@/lib/errors/api"
import { DURATION, PROBABILITY_HIGH, PROBABILITY_LOW } from "@/config"
import { sleep } from "@/utils"

type LoginKeys = "email" | "password"
type LoginDetails = Record<LoginKeys, string>
type LoginPayload = { token: string }

export async function login({}: LoginDetails): Promise<LoginPayload> {
  await sleep(Math.random() * DURATION)

  if (Math.random() < PROBABILITY_HIGH) {
    throw new Unauthorized("Invalid credentials")
  }

  if (Math.random() < PROBABILITY_HIGH) {
    const tag = "invalid"
    const field = "email"
    const details = { field, tag } as const
    const message = `Invalid ${field}`
    throw new BadRequest(message, details)
  }

  if (Math.random() < PROBABILITY_LOW) {
    throw new ImATeapot("Don't share your password with a teapot!")
  }

  if (Math.random() < PROBABILITY_LOW) {
    throw new InternalServerError(
      "An unexpected error occurred while processing your request",
    )
  }

  if (Math.random() < PROBABILITY_LOW) {
    const time = Math.ceil(Math.random() * 120)
    throw new TooManyRequests(`Try again after ${time} seconds`)
  }

  return { token: crypto.randomUUID() }
}
