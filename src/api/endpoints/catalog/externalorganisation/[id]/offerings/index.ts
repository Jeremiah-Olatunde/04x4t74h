import {
  ImATeapot,
  InternalServerError,
  NotFound,
  TooManyRequests,
  Unauthorized,
} from "@/api/errors"
import { DURATION, PROBABILITY_LOW } from "@/config"

import type { BusinessWithReviewsAndServices } from "@/types/business"
import { sleep } from "@/utils"

export async function offerings(
  id: string,
): Promise<BusinessWithReviewsAndServices> {
  const headers = { "Content-Type": "application/json" }

  const promise = fetch("/data/externalorganisation.json", {
    headers,
  })

  await sleep(Math.random() * DURATION)

  const response = await promise

  if (!response.ok) throw response

  if (Math.random() < PROBABILITY_LOW) {
    throw new Unauthorized("Invalid credentials")
  }

  if (Math.random() < PROBABILITY_LOW) {
    throw new ImATeapot("No Roman, I can't brew coffee")
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

  const businesses: readonly BusinessWithReviewsAndServices[] =
    await response.json()

  const business = businesses.find((business) => business.id === id)

  if (business === undefined) {
    const name = "object.id"
    const reason = `a resource with id ${id} does not exist`
    const invalidParams = [{ name, reason }]
    throw new NotFound("Requested business does not exist", { invalidParams })
  }

  return business
}
