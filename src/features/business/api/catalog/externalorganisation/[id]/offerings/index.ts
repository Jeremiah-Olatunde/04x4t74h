import {
  ImATeapot,
  InternalServerError,
  NotFound,
  TooManyRequests,
  Unauthorized,
} from "@/lib/errors/api"
import { DURATION, PROBABILITY_LOW } from "@/config"
import { sleep } from "@/utils"

import type { Business } from "@/features/business/types"
import { Business as Schema } from "@/features/business/schemas"

export async function fetchBusinessOne(id: string): Promise<Business> {
  const path = `${import.meta.env.BASE_URL}data/externalorganisation/${id}.json`
  const headers = { "Content-Type": "application/json" }

  const promise = fetch(path, { headers })

  await sleep(Math.random() * DURATION)

  const response = await promise

  if (response.status === 404) {
    const name = "object.id"
    const reason = `a resource with id ${id} does not exist`
    const invalidParams = [{ name, reason }]
    throw new NotFound("Requested business does not exist", { invalidParams })
  }

  if (response.status === 401 || Math.random() < PROBABILITY_LOW) {
    throw new Unauthorized("Invalid credentials")
  }

  if (response.status === 418 || Math.random() < PROBABILITY_LOW) {
    throw new ImATeapot("No Roman, I can't brew coffee")
  }

  if (response.status === 429 || Math.random() < PROBABILITY_LOW) {
    const time = Math.ceil(Math.random() * 120)
    throw new TooManyRequests(`Try again after ${time} seconds`)
  }

  if (response.status === 500 || Math.random() < PROBABILITY_LOW) {
    throw new InternalServerError(
      "An unexpected error occurred while processing your request",
    )
  }

  if (!response.ok) throw response

  const json = await response.json()
  const business = Schema.parse(json)

  return business
}
