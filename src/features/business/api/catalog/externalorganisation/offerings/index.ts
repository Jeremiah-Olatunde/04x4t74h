import {
  ImATeapot,
  InternalServerError,
  TooManyRequests,
  Unauthorized,
} from "@/lib/errors/api"
import { DURATION, PROBABILITY_LOW } from "@/config"
import type { Business } from "@/features/business/types"
import { Business as Schema } from "@/features/business/schemas"

import { sleep } from "@/utils"

export async function fetchBusinessAll(): Promise<readonly Business[]> {
  const path = `${import.meta.env.BASE_URL}data/externalorganisation.json`
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

  const json = await response.json()
  const businesses = Schema.array().parse(json)

  return businesses
}
