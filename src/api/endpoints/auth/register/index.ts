import {
  BadRequest,
  Conflict,
  ImATeapot,
  InternalServerError,
  TooManyRequests,
} from "@/lib/errors/api"
import { DURATION, PROBABILITY_HIGH, PROBABILITY_LOW } from "@/config"
import { sleep } from "@/utils"

type RegisterKeys = "name" | "email" | "password" | "telephone"
type RegisterDetails = Record<RegisterKeys, string>

export async function register({}: RegisterDetails): Promise<void> {
  await sleep(Math.random() * DURATION)

  if (Math.random() < PROBABILITY_HIGH) {
    throw new Conflict("Email Taken", { field: "email" })
  }

  if (Math.random() < PROBABILITY_HIGH) {
    const fields = ["email", "telephone", "password"]
    const tag = "invalid"
    const message = `Invalid Format`
    const field = fields[Math.floor(Math.random() * 3)]
    const details = { field, tag } as const
    throw new BadRequest(message, details)
  }

  if (Math.random() < PROBABILITY_LOW) {
    throw new ImATeapot("You did not just ask me to make a smoothie")
  }

  if (Math.random() < PROBABILITY_LOW) {
    throw new InternalServerError("Unrecoverable server error")
  }

  if (Math.random() < PROBABILITY_LOW) {
    throw new TooManyRequests("Try again after 120 seconds")
  }
}
