import {
  ImATeapot,
  InternalServerError,
  TooManyRequests,
  Unauthorized,
} from "@/api/errors"
import { DURATION, PROBABILITY_LOW } from "@/config"
import type { Business } from "@/types/business"
import { sleep } from "@/utils"

export async function fetchBusinessAll(): Promise<readonly Business[]> {
  const path = "/data/externalorganisation.json"
  const headers = { "Content-Type": "application/json" }

  const promise = fetch(path, { headers })

  await sleep(Math.random() * DURATION)

  const response = await promise

  if (Math.random() < PROBABILITY_LOW) {
    throw new Unauthorized("Invalid credentials")
  }

  if (Math.random() < PROBABILITY_LOW) {
    throw new ImATeapot("Who do I look like James Hoffman")
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

  if (!response.ok) throw response

  const businesses: readonly Business[] = await response.json()
  return businesses
}
